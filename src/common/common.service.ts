import { Injectable } from '@nestjs/common';

import { UpdateCommonDto } from './dto/update-common.dto';
import { CreateRoleInCaseDto } from './dto/create-roleInCase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleInCase } from './entities/roleInCase.entity';
import { Repository } from 'typeorm';
import { CreateVictimRelationship } from './dto/create-victimRelationship';
import { VictimRealationship } from './entities/VictimRelationship.entity';

@Injectable()
export class CommonService {

  constructor(
    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>,

    @InjectRepository(VictimRealationship)
    private readonly VictimRelationshipRepository: Repository<VictimRealationship>
  ) {}

  async createArole(createRoleInCaseDto: CreateRoleInCaseDto) {
    try {
      const roleResponse = this.RoleInCaseRepository.create(createRoleInCaseDto);
      return await this.RoleInCaseRepository.save(roleResponse);
    } catch (error) { console.log(error); }
    return 'This action adds a new common';
  }

  async createAvictimRelationship(createVictimRelationship: CreateVictimRelationship) {
    try { 
      const victimRelationshipResponse = this.VictimRelationshipRepository.create(
        createVictimRelationship
      );
      return await this.VictimRelationshipRepository.save(
        victimRelationshipResponse
      );
    } catch (error) { console.log(error) }
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
