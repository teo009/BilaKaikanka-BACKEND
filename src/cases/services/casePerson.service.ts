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
      caseId,
      person,
      roleInCase,
      victimRelationship,
      career,
      workplace,
      jobPosition,
      academicLevel,
    } = CreateCasePerson;

    try {
      const caseById = await this.CaseRepository.findOneBy({ id: caseId });
      const personById = await this.PersonRepository.findOneBy({ id: person });
      const roleInCaseById = await this.RoleInCaseRepository.findOneBy({
        id: roleInCase,
      });
      const victimRelationshipId =
        await this.VictimRelationshipRepository.findOneBy({
          id: victimRelationship,
        });
      const careerById = await this.CareerRepository.findOneBy({ id: career });
      const workplaceById = await this.WorkplaceRepository.findOneBy({
        id: workplace,
      });
      const jobPositionById = await this.JobPositionRepository.findOneBy({
        id: jobPosition,
      });
      const AcademicLevelById = await this.AcademicLevelRepository.findOneBy({
        id: academicLevel,
      });

      const caseHasPersonResponse = this.CasePersonRepository.create({
        case_id: caseById,
        person_id: personById,
        roleInCase: roleInCaseById,
        victimRelationship: victimRelationshipId,
        career: careerById,
        workplace: workplaceById,
        jobPosition: jobPositionById,
        academicLevel: AcademicLevelById,
      });
      return await this.CasePersonRepository.save(caseHasPersonResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async updateCasePerson(id: string, updateCasePersonDto: UpdateCasePersonDto) {
    const {
      person,
      roleInCase,
      victimRelationship,
      career,
      workplace,
      jobPosition,
      academicLevel,
    } = updateCasePersonDto;

    try {
      const casePersonToUpdate = await this.CasePersonRepository.preload({
        id,
      });
      if (!casePersonToUpdate)
        throw new NotFoundException(`El caso no ha sido encontrado`);

      //Check if there is an foreignKey update and doing it if there is one
      let personUpdated: object;
      if (person) {
        personUpdated = await this.PersonRepository.findOneBy({ id: person });
      }
      let roleInCaseUpdated: object;
      if (roleInCase) {
        roleInCaseUpdated = await this.RoleInCaseRepository.findOneBy({
          id: roleInCase,
        });
      }
      let victimRelationshipUpdated: object;
      if (victimRelationship) {
        victimRelationshipUpdated =
          await this.VictimRelationshipRepository.findOneBy({
            id: victimRelationship,
          });
      }
      let careerUpdated: object;
      if (career) {
        careerUpdated = await this.CareerRepository.findOneBy({ id: career });
      }
      let workplaceUpdated: object;
      if (workplace) {
        workplaceUpdated = await this.WorkplaceRepository.findOneBy({
          id: workplace,
        });
      }
      let jobPositionUpdated: object;
      if (jobPosition) {
        jobPositionUpdated = await this.JobPositionRepository.findOneBy({
          id: jobPosition,
        });
      }
      let academicLevelUpdated: object;
      if (academicLevel) {
        academicLevelUpdated = await this.AcademicLevelRepository.findOneBy({
          id: academicLevel,
        });
      }

      return await this.CasePersonRepository.save({
        ...casePersonToUpdate,
        person_id: personUpdated,
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
        case_id: true,
        person_id: true,
      },
    });
  }
}
