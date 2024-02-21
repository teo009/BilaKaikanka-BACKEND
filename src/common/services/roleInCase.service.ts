import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RoleInCase } from "../entities/roleInCase.entity";
import { CreateRoleInCaseDto } from "../dto/create/create-roleInCase.dto";
import { UpdateRoleInCaseDto } from "../dto/update/update-roleInCase.dto";

@Injectable()
export class RoleInCaseService {

  constructor(
    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>,
  ) {}

  async createRoleInCase(createRoleInCaseDto: CreateRoleInCaseDto) {
    try {
      const roleResponse = this.RoleInCaseRepository.create(createRoleInCaseDto);
      return await this.RoleInCaseRepository.save(roleResponse);
    } catch (error) { console.log(error); }
  }

  async updateRoleInCase(id: string, updateRoleInCase: UpdateRoleInCaseDto) {
    try { 
      const roleInCaseUpdated = await this.RoleInCaseRepository.preload({ 
        id, ...updateRoleInCase
      });
      return await this.RoleInCaseRepository.save(roleInCaseUpdated);
    } catch(error) { console.log(error); }
  }

}