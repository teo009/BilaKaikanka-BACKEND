import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Case, CasePerson } from './entities/';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CreateCasePersonDto } from './dto/create-casePerson.dto';
import { Person } from 'src/people/entities/person.entity';
import { RoleInCase } from 'src/common/entities/roleInCase.entity';

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
    private readonly RoleInCaseRepository: Repository<RoleInCase>

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
    const { caseId, personId, roleInCaseId } = CreateCasePerson;
    try {
      const caseById = await this.CaseRepository.findOneBy({ id: caseId })
      const personById = await this.PersonInCaseRepository.findOneBy({ id: personId })
      const roleInCaseById = await this.RoleInCaseRepository.findOneBy({ id: roleInCaseId })

      const caseHasPersonResponse = this.CasePersonRepository.create(
        { case_id: caseById, person_id: personById, roleInCase: roleInCaseById }
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
