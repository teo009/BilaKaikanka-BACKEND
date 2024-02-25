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
      const careerById = await this.CareerRepository.findOneBy({ id: career });
      const workplaceById = await this.WorkplaceRepository.findOneBy({
        id: workplace,
      });
      const municipalityById = await this.MunicipalityRepository.findOneBy({
        id: municipality,
      });
      const jobpositionById = await this.JobpositionRepository.findOneBy({
        id: jobposition,
      });
      const identityTypeById = await this.IdentityTypeRepository.findOneBy({
        id: identityType,
      });
      const academicLevelById = await this.AcademicLevelRepository.findOneBy({
        id: academicLevel,
      });

      const peopleResponse = this.PersonRepository.create({
        ...createPersonData,
        career: careerById,
        workplace: workplaceById,
        municipality: municipalityById,
        jobposition: jobpositionById,
        identityType: identityTypeById,
        academicLevel: academicLevelById,
      });
      await this.PersonRepository.save(peopleResponse);
      return peopleResponse;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all people`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const {
      career,
      workplace,
      municipality,
      jobposition,
      identityType, // => PENDING TO UPDATE
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
        careerUpdated = await this.CareerRepository.findOneBy({ id: career });
      }
      let workplaceUpdated: object;
      if (workplace) {
        workplaceUpdated = await this.WorkplaceRepository.findOneBy({
          id: workplace,
        });
      }
      let municipalityUpdated: object;
      if (municipality) {
        municipalityUpdated = await this.MunicipalityRepository.findOneBy({
          id: municipality,
        });
      }
      let jobpositionUpdated: object;
      if (jobposition) {
        jobpositionUpdated = await this.JobpositionRepository.findOneBy({
          id: jobposition,
        });
      }
      let academicLevelUpdated: object;
      if (academicLevel) {
        academicLevelUpdated = await this.AcademicLevelRepository.findOneBy({
          id: academicLevel,
        });
      }

      return await this.PersonRepository.save({
        ...people,
        career: careerUpdated,
        workplace: workplaceUpdated,
        municipality: municipalityUpdated,
        jobposition: jobpositionUpdated,
        academicLevel: academicLevelUpdated,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      await this.dataSource
        .getRepository(Person)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `La persona id: ${id} ha sido eliminada exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
