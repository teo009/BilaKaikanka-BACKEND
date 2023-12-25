import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Case, CasePerson } from './entities/';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CasesService {

  constructor(
    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    @InjectRepository(CasePerson)
    private readonly CasePersonRepository: Repository<CasePerson>
  ) {}

  async create(createCaseDto: CreateCaseDto) {
    try {
      const caseResponse = this.CaseRepository.create(createCaseDto);
      await this.CaseRepository.save(caseResponse)
      return caseResponse;
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
