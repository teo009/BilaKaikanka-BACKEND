import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Between } from 'typeorm';

import { RegionalCenter } from 'src/common/entities';
import { Case, CasePerson } from 'src/cases/entities';
import { CasesByQuarterOrMonthlyDto } from 'src/cases/dto/reportsDtos';

import { CommonService } from 'src/common/services';

@Injectable()
export class CasesReportsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly commonService: CommonService,

    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,
  ) {}

  async mainReport(
    regionalCenter: string,
    reportOptions: CasesByQuarterOrMonthlyDto,
  ) {
    await this.commonService.getOne(
      regionalCenter,
      this.RegionalCenterRepository,
    );
    try {
      const caseData = await this.dataSource
        .getRepository(Case)
        .createQueryBuilder('case')
        .leftJoinAndSelect('case.casePerson', 'casePerson')
        .leftJoinAndSelect('case.regionalCenter', 'regionalCenter')
        .leftJoinAndSelect('casePerson.person', 'person')
        .leftJoinAndSelect('casePerson.roleInCase', 'roleInCase')
        .leftJoinAndSelect('case.caseTracking', 'caseTracking')
        .leftJoinAndSelect('caseTracking.trackingStatus', 'trackingStatus')
        .leftJoinAndSelect('case.caseViolence', 'caseViolence')
        .leftJoinAndSelect('caseViolence.violenceType', 'violenceType')
        .select([
          'case.code',
          'regionalCenter.name',
          'casePerson.id',
          'person.gender',
          'person.ethnicity',
          'roleInCase.name',
          'caseTracking.id',
          'trackingStatus.name',
          'caseViolence.id',
          'violenceType.name',
        ])
        .where({
          regionalCenter_id: regionalCenter,
        })
        .andWhere({
          occurrence_date: Between(
            reportOptions.startDate,
            reportOptions.endDate,
          ),
        })
        .getMany();

      const personas: Array<CasePerson> = [];
      let regionalCenterToCLient: string = '';
      const violencesTypes: { [key: string]: number } = {};
      const aggressorsGender: { [key: string]: number } = {
        male: 0,
        female: 0,
      };
      const aggressorsEthnicity: { [key: string]: number } = {
        creole: 0,
        mestiza: 0,
        miskito: 0,
        rama: 0,
        garifona: 0,
        mayagna: 0,
      };
      const victimsGender: { [key: string]: number } = {
        male: 0,
        female: 0,
      };
      const victimsEthnicity: { [key: string]: number } = {
        creole: 0,
        mestiza: 0,
        miskito: 0,
        rama: 0,
        garifona: 0,
        mayagna: 0,
      };
      const trackingStatus: { [key: string]: Case[] } = {
        pending: [],
        in: [],
        done: [],
        unsolved: [],
        remited: [],
      };

      caseData.forEach((singleCase: any) => {
        regionalCenterToCLient = singleCase.regionalCenter.name;
        personas.push(...singleCase.casePerson);
        const status: string = singleCase.caseTracking[0].trackingStatus.name;
        trackingStatus[status].push(singleCase);
        if (singleCase.caseViolence[0]) {
          const name = singleCase.caseViolence[0].violenceType.name;
          violencesTypes[name]
            ? (violencesTypes[name] += 1)
            : (violencesTypes[name] = 1);
        }
      });

      personas.forEach((singleCP: CasePerson) => {
        const personGender: string = singleCP.person.gender;
        const personEthnicity: string = singleCP.person.ethnicity;
        if (singleCP.roleInCase.name === 'Victima') {
          victimsEthnicity[personEthnicity] += 1;
          victimsGender[personGender] += 1;
        }
        if (singleCP.roleInCase.name === 'Agresor') {
          aggressorsEthnicity[personEthnicity] += 1;
          aggressorsGender[personGender] += 1;
        }
      });

      return {
        casos: caseData.length,
        personas: personas.length,
        generoDeVictimas: {
          masculino: victimsGender.male,
          femenino: victimsGender.female,
        },
        etniaDeVictimas: victimsEthnicity,
        generoDeAgresores: {
          masculino: aggressorsGender.male,
          femenino: aggressorsGender.female,
        },
        etniaDeAgresores: aggressorsEthnicity,
        estadoDeLosCasos: {
          pendientesDeInvestigacion: trackingStatus.pending.length,
          enInvestigacion: trackingStatus.in.length,
          resueltos: trackingStatus.done.length,
          noResueltos: trackingStatus.unsolved.length,
          remitidos: trackingStatus.remited.length,
        },
        tiposDeViolencia: violencesTypes,
        regionalCenterToCLient,
      };
      /*
        stIncidentCases: 'pending...',
        repeatedIncidentCases: 'pending...',*/
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getCaseReceptionFormat(parameter: { caseId: string }) {
    try {
      const rows = await this.dataSource
        .getRepository(CasePerson)
        .createQueryBuilder('casePerson')
        .leftJoin('casePerson.case', 'case')
        .leftJoin('casePerson.person', 'person')
        .leftJoin('casePerson.roleInCase', 'roleInCase')
        .leftJoin('casePerson.academicLevel', 'academicLevel')
        .leftJoin('casePerson.workplace', 'workplace')
        .leftJoin('casePerson.jobPosition', 'jobPosition')
        .leftJoin('casePerson.victimRelationship', 'victimRelationship')
        .leftJoin('case.caseViolence', 'caseViolence')
        .leftJoin('caseViolence.violenceType', 'violenceType')
        .select([
          'violenceType',
          'case',
          'person',
          'roleInCase',
          'academicLevel',
          'workplace',
          'jobPosition',
          'victimRelationship',
        ])
        .where('casePerson.case = :caseId', { caseId: parameter })
        .getRawMany();
      const sortedResponse = rows.reduce((acc, curr) => {
        let response;
        if (!acc[curr.case_id]) {
          response = {
            case: {
              id: curr.case_id,
              code: curr.case_code,
              number: curr.case_case_number,
              narration: curr.case_narration,
              place_of_events: curr.case_place_of_events,
              occurrence_time: curr.case_occurrence_time,
              occurrence_date: curr.case_occurrence_date.toISOString(),
              reception_date: curr.case_reception_date.toISOString(),
              person: {
                victim: [],
                complainant: [],
                aggressor: [],
              },
            },
          };
        }
        return response;
      }, {});
      rows.map((person) => {
        if (person.roleInCase_name === 'Victima')
          sortedResponse.case.person.victim.push(
            this.buildPersonByRoleInCaseResponse(person),
          );
        if (person.roleInCase_name === 'Denunciante')
          sortedResponse.case.person.complainant.push(
            this.buildPersonByRoleInCaseResponse(person),
          );
        if (person.roleInCase_name === 'Agresor')
          sortedResponse.case.person.aggressor.push(
            this.buildPersonByRoleInCaseResponse(person),
          );
      });
      return this.commonService.generatePdf(sortedResponse.case);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
    /*
    etnia
    estado civil
    centro de estudio / carrera y año
    */
  }

  buildPersonByRoleInCaseResponse(person) {
    return {
      id: person.person_id,
      role_in_case: person.roleInCase_name,
      firstName: person.person_firstName,
      secondName: person.person_secondName,
      birthDate: person.person_birthDate.toISOString(),
      gender: person.person_gender,
      phoneNumbers: person.person_phoneNumbers,
      homeAddress: person.person_homeAddress,
      identity: person.person_identity,
      workplace: person.workplace_name,
      jobPosition: person.jobPosition_name,
      victimRelationship: person.victimRelationship_name,
      academicLevel: {
        id: person.academicLevel_id,
        academicLevel: person.academicLevel_name,
      },
      violenceType: {
        id: person.violenceType_id,
        violenceType: person.violenceType_name,
      },
    };
  }
}
