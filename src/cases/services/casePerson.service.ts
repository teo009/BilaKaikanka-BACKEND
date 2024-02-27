import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Person } from 'src/people/entities/person.entity';
import { Case, CasePerson } from '../entities';
import { CreateCasePersonDto, UpdateCasePersonDto } from '../dto/casePerson/';

import {
  RoleInCase,
  VictimRelationship,
  Career,
  Workplace,
  JobPosition,
  AcademicLevel,
} from 'src/common/entities/';

@Injectable()
export class CasePersonService {
  constructor(
    @InjectRepository(CasePerson)
    private readonly CasePersonRepository: Repository<CasePerson>,

    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

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
  ) {}

  async createCasePerson(CreateCasePerson: CreateCasePersonDto) {
    const {
      case_id,
      person_id,
      roleInCase_id,
      victimRelationship_id,
      career_id,
      workplace_id,
      jobPosition_id,
      academicLevel_id,
    } = CreateCasePerson;

    try {
      const caseHasPersonResponse = this.CasePersonRepository.create({
        case_id,
        person_id,
        roleInCase_id,
        victimRelationship_id,
        career_id,
        workplace_id,
        jobPosition_id,
        academicLevel_id,
      });
      return await this.CasePersonRepository.save(caseHasPersonResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async updateCasePerson(id: string, updateCasePersonDto: UpdateCasePersonDto) {
    const {
      person_id,
      roleInCase_id,
      victimRelationship_id,
      career_id,
      workplace_id,
      jobPosition_id,
      academicLevel_id,
    } = updateCasePersonDto;

    try {
      const casePersonToUpdate = await this.CasePersonRepository.preload({
        id,
      });
      if (!casePersonToUpdate)
        throw new NotFoundException(`El caso no ha sido encontrado`);

      //Check if there is an foreignKey update and doing it if there is one
      let personUpdated: object;
      if (person_id) {
        personUpdated = await this.PersonRepository.findOneBy({
          id: person_id,
        });
      }
      let roleInCaseUpdated: object;
      if (roleInCase_id) {
        roleInCaseUpdated = await this.RoleInCaseRepository.findOneBy({
          id: roleInCase_id,
        });
      }
      let victimRelationshipUpdated: object;
      if (victimRelationship_id) {
        victimRelationshipUpdated =
          await this.VictimRelationshipRepository.findOneBy({
            id: victimRelationship_id,
          });
      }
      let careerUpdated: object;
      if (career_id) {
        careerUpdated = await this.CareerRepository.findOneBy({
          id: career_id,
        });
      }
      let workplaceUpdated: object;
      if (workplace_id) {
        workplaceUpdated = await this.WorkplaceRepository.findOneBy({
          id: workplace_id,
        });
      }
      let jobPositionUpdated: object;
      if (jobPosition_id) {
        jobPositionUpdated = await this.JobPositionRepository.findOneBy({
          id: jobPosition_id,
        });
      }
      let academicLevelUpdated: object;
      if (academicLevel_id) {
        academicLevelUpdated = await this.AcademicLevelRepository.findOneBy({
          id: academicLevel_id,
        });
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
      console.log(error);
    }
  }

  async removeCasePerson(id: string) {
    try {
      await this.dataSource
        .getRepository(CasePerson)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El caso - persona id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCasePeople() {
    return await this.CasePersonRepository.find({
      relations: {
        case: true,
        person: true,
      },
    });
  }
}
