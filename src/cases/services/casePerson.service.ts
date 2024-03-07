import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Person } from 'src/people/entities/person.entity';
import { CasePerson } from '../entities';
import { CreateCasePersonDto, UpdateCasePersonDto } from '../dto/casePerson/';

import {
  RoleInCase,
  VictimRelationship,
  Career,
  Workplace,
  JobPosition,
  AcademicLevel,
} from 'src/common/entities/';
import { CommonService } from 'src/common/services';

@Injectable()
export class CasePersonService {
  constructor(
    @InjectRepository(CasePerson)
    private readonly CasePersonRepository: Repository<CasePerson>,

    @InjectRepository(Person)
    private readonly PersonRepository: Repository<Person>,

    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>,

    @InjectRepository(VictimRelationship)
    private readonly VictimRelationshipRepository: Repository<VictimRelationship>,

    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,

    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,

    @InjectRepository(JobPosition)
    private readonly JobPositionRepository: Repository<JobPosition>,

    @InjectRepository(AcademicLevel)
    private readonly AcademicLevelRepository: Repository<AcademicLevel>,

    private readonly dataSource: DataSource,
    private readonly commonService: CommonService,
  ) {}

  async createCasePerson(CreateCasePerson: CreateCasePersonDto) {
    try {
      const caseHasPersonResponse =
        this.CasePersonRepository.create(CreateCasePerson);
      return await this.CasePersonRepository.save(caseHasPersonResponse);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async updateCasePerson(id: string, updateCasePersonDto: UpdateCasePersonDto) {
    try {
      const casePersonToUpdate = await this.CasePersonRepository.preload({
        id,
      });
      if (!casePersonToUpdate)
        return new NotFoundException('Case Person not found'); //Change this for the common method

      //Check if there is an foreignKey update and doing it if there is one
      let personUpdated: object;
      if (updateCasePersonDto.person_id) {
        personUpdated = await this.commonService.getOne(
          updateCasePersonDto.person_id,
          this.PersonRepository,
        );
      }
      let roleInCaseUpdated: object;
      if (updateCasePersonDto.roleInCase_id) {
        roleInCaseUpdated = await this.commonService.getOne(
          updateCasePersonDto.roleInCase_id,
          this.RoleInCaseRepository,
        );
      }
      let victimRelationshipUpdated: object;
      if (updateCasePersonDto.victimRelationship_id) {
        victimRelationshipUpdated = await this.commonService.getOne(
          updateCasePersonDto.victimRelationship_id,
          this.VictimRelationshipRepository,
        );
      }
      let careerUpdated: object;
      if (updateCasePersonDto.career_id) {
        careerUpdated = await this.commonService.getOne(
          updateCasePersonDto.career_id,
          this.CareerRepository,
        );
      }
      let workplaceUpdated: object;
      if (updateCasePersonDto.workplace_id) {
        workplaceUpdated = await this.commonService.getOne(
          updateCasePersonDto.workplace_id,
          this.WorkplaceRepository,
        );
      }
      let jobPositionUpdated: object;
      if (updateCasePersonDto.jobPosition_id) {
        jobPositionUpdated = await this.commonService.getOne(
          updateCasePersonDto.jobPosition_id,
          this.JobPositionRepository,
        );
      }
      let academicLevelUpdated: object;
      if (updateCasePersonDto.academicLevel_id) {
        academicLevelUpdated = await this.commonService.getOne(
          updateCasePersonDto.academicLevel_id,
          this.AcademicLevelRepository,
        );
      }
      return await this.CasePersonRepository.save({
        ...casePersonToUpdate,
        person: personUpdated,
        roleInCase: roleInCaseUpdated,
        victimRelationship: victimRelationshipUpdated,
        career: careerUpdated,
        workplace: workplaceUpdated,
        jobPosition: jobPositionUpdated,
        academicLevel: academicLevelUpdated,
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeCasePerson(id: string) {
    try {
      const response = await this.dataSource
        .getRepository(CasePerson)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "case - person" found to remove`,
          })
        : `The "case - person": ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAllCasePeople() {
    try {
      const response = await this.CasePersonRepository.find({
        relations: {
          case: true,
          person: true,
        },
      });
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems that "case - person" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let singleCasePerson: any;
    if (!repository) {
      singleCasePerson = await this.CasePersonRepository.findOneBy({
        id,
      });
    } else {
      singleCasePerson = await repository.findOneBy({
        id,
      });
    }
    if (!singleCasePerson)
      throw new NotFoundException('Register was not found');
    return singleCasePerson;
  }
}
