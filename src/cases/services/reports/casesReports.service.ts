import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RegionalCenter } from 'src/common/entities';
import { CasePerson } from 'src/cases/entities';

@Injectable()
export class CasesReportsService {
  constructor(private readonly dataSource: DataSource) {}

  async getCasesReportsByRegionalCenter(parameters: {
    regionalCenter: string;
  }) {
    try {
      const regionalCenter = await this.dataSource
        .getRepository(RegionalCenter)
        .createQueryBuilder('cur')
        .leftJoinAndSelect('cur.cases', 'case')
        .where('cur.regionalCenter = :regionalCenter', {
          regionalCenter: parameters.regionalCenter,
        })
        .getMany();
      return regionalCenter.length === 0
        ? {
            status: 'Error',
            detail: `No cases registered in ${parameters.regionalCenter} CUR`,
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
}
