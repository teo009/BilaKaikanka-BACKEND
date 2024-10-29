import { Injectable } from '@nestjs/common';
import { DataSource, Repository, Between } from 'typeorm';

import { RegionalCenter } from 'src/common/entities';
import { Case, CasePerson } from 'src/cases/entities';
import {
  CasesByQuarterOrMonthlyDto,
  CasesReportsByRegionalCenterDto,
} from 'src/cases/dto/reportsDtos';
import { CommonService } from 'src/common/services';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CasesReportsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly commonService: CommonService,

    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,
  ) {}

  async getCasesByQuarterOrMonthly(
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
        .leftJoinAndSelect('casePerson.roleInCase', 'roleInCase')
        .leftJoinAndSelect('casePerson.person', 'person')
        .leftJoinAndSelect('case.caseTracking', 'caseTracking')
        .leftJoinAndSelect('caseTracking.trackingStatus', 'trackingStatus')
        .select([
          'case.occurrence_date',
          'case.code',
          'casePerson.id',
          'person.gender',
          'roleInCase.name',
          'caseTracking.description',
          'trackingStatus.name',
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

      const casePeople: Array<any> = [];
      let victimsGender: Array<string> = [];
      let aggressorsGender: Array<string> = [];
      const trackingStatus: { [key: string]: Case[] } = {
        pending: [],
        in: [],
        done: [],
        unsolved: [],
        remited: [],
      };

      caseData.forEach((singleCase: Case) => {
        const currentStatus = singleCase.caseTracking[0].trackingStatus.name;
        trackingStatus[currentStatus].push(singleCase);
        casePeople.push(singleCase.casePerson);
      });

      casePeople.forEach((casePeople: []) => {
        const victimsGenderr = casePeople
          .filter(
            (casePerson: CasePerson) =>
              casePerson.roleInCase.name === 'Victima',
          )
          .map((casePerson: CasePerson) => casePerson.person.gender);

        const aggressorsGenderr = casePeople
          .filter(
            (casePerson: CasePerson) =>
              casePerson.roleInCase.name === 'Agresor',
          )
          .map((casePerson: CasePerson) => casePerson.person.gender);

        aggressorsGender = [...aggressorsGender, ...aggressorsGenderr];
        victimsGender = [...victimsGender, ...victimsGenderr];
      });

      return {
        registeredCasesQuantity: caseData.length,
        casesPending: trackingStatus.pending.length,
        casesIn: trackingStatus.in.length,
        casesDone: trackingStatus.done.length,
        casesUnsolved: trackingStatus.unsolved.length,
        casesRemited: trackingStatus.remited.length,
        stIncidentCases: 'pending...',
        repeatedIncidentCases: 'pending...',
        victimsGender: victimsGender,
        aggressorsGender: aggressorsGender,
        casesQuantityByViolencesType: [], //Cantidad de casos por tipo de violencia
        //casesData: caseData,
      };
    } catch (error) {
      console.log(error);
      this.commonService.handleDBExceptions(error);
    }
  }

  async getCasesReportsByRegionalCenter(
    parameter: CasesReportsByRegionalCenterDto,
  ) {
    try {
      const regionalCenter = await this.dataSource
        .getRepository(RegionalCenter)
        .createQueryBuilder('cur')
        .leftJoinAndSelect('cur.cases', 'case')
        .where('cur.regionalCenter = :regionalCenter', {
          regionalCenter: parameter.regionalCenter,
        })
        .getMany();
      return regionalCenter.length === 0
        ? {
            status: 'Error',
            detail: `No cases registered in ${parameter.regionalCenter} CUR`,
          }
        : regionalCenter;
    } catch (error) {
      console.log(error);
    }
  }

  async getCasesReportsByGender(parameters: { gender: string }) {
    const casesByGender = await this.dataSource
      .getRepository(CasePerson)
      .createQueryBuilder('casePerson')
      .leftJoin('casePerson.person', 'person')
      .leftJoin('casePerson.case', 'case')
      .select([
        'casePerson.id',
        'case',
        'casePerson.roleInCase_id',
        'casePerson.victimRelationship_id',
        'casePerson.career_id',
        'casePerson.workplace_id',
        'casePerson.jobPosition_id',
        'casePerson.academicLevel_id',
        'person.firstName',
        'person.secondName',
        'person.gender',
      ])
      .where('person.gender = :genderParam', {
        genderParam: parameters.gender,
      })
      .getRawMany();
    return casesByGender;
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

  async getViolenceTypeByRegionalCenter(parameter: { regionalCenter: string }) {
    try {
      const rows = await this.dataSource
        .getRepository(RegionalCenter)
        .createQueryBuilder('cur')
        .leftJoin('cur.cases', 'case')
        .leftJoin('case.caseViolence', 'caseViolenceType')
        .leftJoin('caseViolenceType.violenceType', 'violenceType')
        .select(['cur', 'violenceType'])
        .where('cur.regionalCenter = :regionalCenterParam', {
          regionalCenterParam: parameter.regionalCenter,
        })
        .getRawMany();
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getRolesRelation(parameter: { regionalCenter: string }) {
    try {
      console.log(parameter.regionalCenter);
      const rows = await this.dataSource
        .getRepository(CasePerson)
        .createQueryBuilder('casePerson')
        .leftJoin('casePerson.person', 'person')
        .leftJoin('casePerson.case', 'case')
        .leftJoin('case.regionalCenter', 'regionalCenter')
        .select(['case.case_number', 'person.gender'])
        .where('regionalCenter.regionalCenter = :regionalCenter', {
          regionalCenter: parameter.regionalCenter,
        })
        .getRawMany();
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  buildPersonByRoleInCaseResponse(person) {
    //console.log(person);
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
