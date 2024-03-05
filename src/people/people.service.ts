import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Person } from './entities/person.entity';
import { CreatePersonDto, UpdatePersonDto } from './dto/';

import {
  Career,
  Workplace,
  Municipality,
  JobPosition,
  IdentityType,
  AcademicLevel,
} from 'src/common/entities/';
import { CommonService } from 'src/common/services';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly PersonRepository: Repository<Person>,
    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,
    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,
    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,
    @InjectRepository(JobPosition)
    private readonly JobpositionRepository: Repository<JobPosition>,
    @InjectRepository(IdentityType)
    private readonly IdentityTypeRepository: Repository<IdentityType>,
    @InjectRepository(AcademicLevel)
    private readonly AcademicLevelRepository: Repository<AcademicLevel>,

    private readonly dbExceptionsService: CommonService,
    private readonly getOneCommonMethod: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const {
      career,
      workplace,
      municipality,
      jobposition,
      identityType,
      academicLevel,
      ...createPersonData
    } = createPersonDto;
    try {
      const peopleResponse = this.PersonRepository.create({
        ...createPersonData,
        career_id: career,
        workplace_id: workplace,
        municipality_id: municipality,
        jobPosition_id: jobposition,
        identityType_id: identityType,
        academicLevel_id: academicLevel,
      });
      await this.PersonRepository.save(peopleResponse);
      return peopleResponse;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async getAll() {
    let response: any;
    try {
      response = await this.PersonRepository.find({
        relations: {
          career: true,
          workplace: true,
          municipality: true,
          jobposition: true,
          identityType: true,
          academicLevel: true,
        },
      });
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
    if (response.length === 0) {
      this.dbExceptionsService.handleDBExceptions({
        code: '23503',
        detail: 'Data not found, Its seems that people schema is empty',
      });
    }
    return response;
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    try {
      if (!repository) {
        data = await this.PersonRepository.findOneBy({ id });
      } else {
        data = await repository.findOneBy({ id });
      }
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
    if (data === null)
      this.dbExceptionsService.handleDBExceptions({
        code: '23503',
        detail: 'Person not found',
      });
    return data;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const {
      career,
      workplace,
      municipality,
      jobposition,
      identityType,
      academicLevel,
      ...dataToUpdate
    } = updatePersonDto;

    try {
      const people = await this.PersonRepository.preload({
        id,
        ...dataToUpdate,
      });
      if (!people)
        throw new NotFoundException(`La persona no ha sido encontrada`);

      //Check if there is an foreignKey update and doing it if there is one
      let careerUpdated: object;
      if (career) {
        careerUpdated = await this.getOneCommonMethod.getOne(
          career,
          this.CareerRepository,
        );
      }
      let workplaceUpdated: object;
      if (workplace) {
        workplaceUpdated = await this.getOneCommonMethod.getOne(
          workplace,
          this.WorkplaceRepository,
        );
      }
      let municipalityUpdated: object;
      if (municipality) {
        municipalityUpdated = await this.getOneCommonMethod.getOne(
          municipality,
          this.MunicipalityRepository,
        );
      }
      let jobpositionUpdated: object;
      if (jobposition) {
        jobpositionUpdated = await this.getOneCommonMethod.getOne(
          jobposition,
          this.JobpositionRepository,
        );
      }
      let identityTypeUpdated: object;
      if (identityType) {
        identityTypeUpdated = await this.getOneCommonMethod.getOne(
          identityType,
          this.IdentityTypeRepository,
        );
      }
      let academicLevelUpdated: object;
      if (academicLevel) {
        academicLevelUpdated = await this.getOneCommonMethod.getOne(
          academicLevel,
          this.AcademicLevelRepository,
        );
      }

      return await this.PersonRepository.save({
        ...people,
        career: careerUpdated,
        workplace: workplaceUpdated,
        municipality: municipalityUpdated,
        jobposition: jobpositionUpdated,
        identityType: identityTypeUpdated,
        academicLevel: academicLevelUpdated,
      });
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const response = await this.dataSource
        .getRepository(Person)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();

      return response.affected === 0
        ? this.dbExceptionsService.handleDBExceptions({
            code: '23503',
            detail: 'No person found to delete',
          })
        : `La persona id: ${id} ha sido eliminada exitosamente`;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }
}
