import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';
import { CommonService } from 'src/common/services';
import { CreatePersonDto, UpdatePersonDto } from './dto/';

import {
  Career,
  Workplace,
  Municipality,
  JobPosition,
  IdentityType,
  AcademicLevel,
  RegionalCenter,
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
    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,
    @InjectRepository(JobPosition)
    private readonly JobpositionRepository: Repository<JobPosition>,
    @InjectRepository(IdentityType)
    private readonly IdentityTypeRepository: Repository<IdentityType>,
    @InjectRepository(AcademicLevel)
    private readonly AcademicLevelRepository: Repository<AcademicLevel>,

    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const {
      career,
      workplace,
      municipality,
      jobposition,
      identityType,
      academicLevel,
      regionalCenter,
      ...createPersonData
    } = createPersonDto;
    try {
      const peopleResponse = this.PersonRepository.create({
        ...createPersonData,
        career_id: career,
        workplace_id: workplace,
        municipality_id: municipality,
        jobposition_id: jobposition,
        identityType_id: identityType,
        academicLevel_id: academicLevel,
        regionalCenter_id: regionalCenter,
      });
      return await this.PersonRepository.save(peopleResponse);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(curId: string): Promise<Array<Person>> {
    try {
      const response = await this.PersonRepository.find({
        relations: {
          career: true,
          workplace: true,
          municipality: true,
          regionalCenter: true,
          jobposition: true,
          identitytype: true,
          academicLevel: true,
        },
        where: { regionalCenter_id: curId },
      });
      if (response.length === 0) {
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Información no encontrada, no hay personas registradas',
        });
      }
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOneWithDetails(id: string): Promise<Person> {
    try {
      const response = await this.dataSource
        .getRepository(Person)
        .createQueryBuilder('person')
        .leftJoin('person.casePerson', 'casePerson')
        .leftJoin('casePerson.case', 'case')
        .leftJoin('case.caseViolence', 'caseViolence')
        .leftJoin('caseViolence.violenceType', 'violenceType')
        .leftJoin('casePerson.roleInCase', 'roleInCase')
        .leftJoin('person.career', 'career')
        .leftJoin('person.workplace', 'workplace')
        .leftJoin('person.municipality', 'municipality')
        .leftJoin('person.regionalCenter', 'regionalCenter')
        .leftJoin('person.jobposition', 'jobposition')
        .leftJoin('person.identitytype', 'identitytype')
        .leftJoin('person.academicLevel', 'academicLevel')
        .select([
          'person',
          'casePerson.id',
          'roleInCase',
          'case',
          'caseViolence.id',
          'violenceType',
          'career',
          'workplace',
          'municipality',
          'regionalCenter',
          'jobposition',
          'identitytype',
          'academicLevel',
        ])
        .where('person.id = :id', { id })
        .getOne();
      if (!response)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'Datos no encontrados, al parecer no hay registro de personas por acá',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const {
      career,
      workplace,
      municipality,
      jobposition,
      identityType,
      academicLevel,
      regionalCenter,
      ...dataToUpdate
    } = updatePersonDto;
    try {
      const people = await this.PersonRepository.preload({
        id,
        ...dataToUpdate,
      });
      if (!people)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Person to update not found',
        });

      //Check if there is an foreignKey update and doing it if there is one
      let careerUpdated: object;
      if (career) {
        careerUpdated = await this.commonService.getOne(
          career,
          this.CareerRepository,
        );
      }
      let workplaceUpdated: object;
      if (workplace) {
        workplaceUpdated = await this.commonService.getOne(
          workplace,
          this.WorkplaceRepository,
        );
      }
      let municipalityUpdated: object;
      if (municipality) {
        municipalityUpdated = await this.commonService.getOne(
          municipality,
          this.MunicipalityRepository,
        );
      }
      let regionalCenterUpdated: object;
      if (regionalCenter) {
        regionalCenterUpdated = await this.commonService.getOne(
          regionalCenter,
          this.RegionalCenterRepository,
        );
      }
      let jobpositionUpdated: object;
      if (jobposition) {
        jobpositionUpdated = await this.commonService.getOne(
          jobposition,
          this.JobpositionRepository,
        );
      }
      let identityTypeUpdated: object;
      if (identityType) {
        identityTypeUpdated = await this.commonService.getOne(
          identityType,
          this.IdentityTypeRepository,
        );
      }
      let academicLevelUpdated: object;
      if (academicLevel) {
        academicLevelUpdated = await this.commonService.getOne(
          academicLevel,
          this.AcademicLevelRepository,
        );
      }
      return await this.PersonRepository.save({
        ...people,
        career: careerUpdated,
        workplace: workplaceUpdated,
        municipality: municipalityUpdated,
        regionalCenter: regionalCenterUpdated,
        jobposition: jobpositionUpdated,
        identityType: identityTypeUpdated,
        academicLevel: academicLevelUpdated,
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(Person)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: 'No person found to remove',
          })
        : `The person: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
