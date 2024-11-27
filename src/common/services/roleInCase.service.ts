import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { RoleInCase } from '../entities/roleInCase.entity';
import { CreateRoleInCaseDto } from '../dto/create/create-roleInCase.dto';
import { UpdateRoleInCaseDto } from '../dto/update/update-roleInCase.dto';
import { CommonService } from './common.service';

@Injectable()
export class RoleInCaseService {
  constructor(
    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createRoleInCase(
    createRoleInCaseDto: CreateRoleInCaseDto,
  ): Promise<RoleInCase> {
    try {
      const response = this.RoleInCaseRepository.create(createRoleInCaseDto);
      return await this.RoleInCaseRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<RoleInCase>> {
    try {
      const response = await this.RoleInCaseRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems that "role in case" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<any> {
    return this.commonService.getOne(id, this.RoleInCaseRepository);
  }

  async updateRoleInCase(
    id: string,
    updateRoleInCase: UpdateRoleInCaseDto,
  ): Promise<RoleInCase> {
    try {
      const roleInCaseUpdated = await this.RoleInCaseRepository.preload({
        id,
        ...updateRoleInCase,
      });
      if (!roleInCaseUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `Role in case to update not Found`,
        });
      return await this.RoleInCaseRepository.save(roleInCaseUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeRoleInCase(id: string) {
    try {
      const response = await this.dataSource
        .getRepository(RoleInCase)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "role in case" found to remove`,
          })
        : `Role in case with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
