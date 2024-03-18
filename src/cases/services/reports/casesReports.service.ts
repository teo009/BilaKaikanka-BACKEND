import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RegionalCenter } from 'src/common/entities';
import { CasePerson } from 'src/cases/entities';

import {
  CaseReceptionFormatDto,
  CasesReportsByRegionalCenterDto,
} from 'src/cases/dto/reportsDtos';

@Injectable()
export class CasesReportsService {
  constructor(private readonly dataSource: DataSource) {}

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

  async getCaseReceptionFormat(parameter: CaseReceptionFormatDto) {
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
          'violenceType.id',
          'violenceType.violenceType',
          'case.id',
          'case.code', //file number (número del expediente)
          'case.case_number',
          'case.reception_date', //day / month / year / hour
          'case.occurrence_date', //day / month / year / hour
          'case.occurrence_time',
          'case.place_of_events',
          'case.narration',
          'case.place_of_events',
          'case.narration',
          'person.id',
          'roleInCase.roleName',
          'person.firstName',
          'person.secondName',
          'person.birthDate', //get age from here
          //Add ethnicity here
          'person.gender',
          'person.identity',
          'person.phoneNumbers',
          'person.homeAddress',
          //Add marital status here
          'academicLevel.id',
          'academicLevel.academicLevel',
          'workplace.workplace',
          'jobPosition.jobPosition',
          'victimRelationship.victimRelationship',
        ])
        .where('casePerson.case = :caseId', { parameter })
        .getRawMany();
      return rows;
    } catch (error) {
      console.log(error);
    }
    /*
    etnia
    estado civil
    centro de estudio / carrera y año
    */
  }
}
