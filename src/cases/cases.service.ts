import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Case, CasePerson } from './entities/';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CreateCasePersonDto } from './dto/create-casePerson.dto';
import { Person } from 'src/people/entities/person.entity';
import { RoleInCase } from 'src/common/entities/roleInCase.entity';
import { VictimRealationship } from 'src/common/entities/VictimRelationship.entity';
import { Career } from 'src/common/entities/Career.entity';
import { Workplace } from 'src/common/entities/Workplace.entity';
import { JobPosition } from 'src/common/entities/jobPosition.entity';
import { AcademicLevel } from 'src/common/entities/AcademicLevel.entity';

@Injectable()
export class CasesService {

  constructor(
    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    @InjectRepository(Person)
    private readonly PersonInCaseRepository: Repository<Person>,

    @InjectRepository(CasePerson)
    private readonly CasePersonRepository: Repository<CasePerson>,

    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>,

    @InjectRepository(VictimRealationship)
    private readonly VictimReltionshipRepository: Repository<VictimRealationship>,

    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,

    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,

    @InjectRepository(JobPosition)
    private readonly JobPositionRepository: Repository<JobPosition>,

    @InjectRepository(AcademicLevel)
    private readonly AcademicLevelRepository: Repository<AcademicLevel>,
  ) {}

  async create(createCaseDto: CreateCaseDto) {
    const { ...caseDetails } = createCaseDto;
    try {
      const caseResponse = this.CaseRepository.create({
        ...caseDetails,
      });
      await this.CaseRepository.save(caseResponse)
      return caseResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async createCasePerson(CreateCasePerson: CreateCasePersonDto) {
    const { 
      caseId, 
      person, 
      roleInCase, 
      victimRelationship, 
      career, 
      workplace, 
      jobPosition,
      academicLevel
    } = CreateCasePerson;

    try {
      const caseById = await this.CaseRepository.findOneBy({ id: caseId })
      const personById = await this.PersonInCaseRepository.findOneBy({ id: person })
      const roleInCaseById = await this.RoleInCaseRepository.findOneBy({ id: roleInCase })
      const victimRelationshipId = await this.VictimReltionshipRepository.findOneBy({ id: victimRelationship })
      const careerById = await this.CareerRepository.findOneBy({ id: career })
      const workplaceById = await this.WorkplaceRepository.findOneBy({ id: workplace })
      const jobPositionById = await this.JobPositionRepository.findOneBy({ id: jobPosition })
      const AcademicLevelById = await this.AcademicLevelRepository.findOneBy({ id: academicLevel })

      const caseHasPersonResponse = this.CasePersonRepository.create(
        { 
          case_id: caseById, 
          person_id: personById, 
          roleInCase: roleInCaseById, 
          victimRelationship: victimRelationshipId,
          career: careerById,
          workplace: workplaceById,
          jobPosiion: jobPositionById,
          academicLevel: AcademicLevelById
        }
      );
      return await this.CasePersonRepository.save(caseHasPersonResponse);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all cases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  update(id: number, updateCaseDto: UpdateCaseDto) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
