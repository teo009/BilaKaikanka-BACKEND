import { Injectable } from '@nestjs/common';

import { UpdateCommonDto } from './dto/update-common.dto';
import { CreateRoleInCaseDto } from './dto/create-roleInCase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleInCase } from './entities/roleInCase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {

  constructor(
    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>
  ) {}

  async createArole(createRoleInCaseDto: CreateRoleInCaseDto) {
    try {
      const roleResponse = this.RoleInCaseRepository.create(createRoleInCaseDto);
      return await this.RoleInCaseRepository.save(roleResponse);
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new common';
  }

  findAll() {
    return `This action returns all common`;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  update(id: number, updateCommonDto: UpdateCommonDto) {
    return `This action updates a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }
}
