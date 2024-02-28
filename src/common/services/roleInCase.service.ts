import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { RoleInCase } from '../entities/roleInCase.entity';
import { CreateRoleInCaseDto } from '../dto/create/create-roleInCase.dto';
import { UpdateRoleInCaseDto } from '../dto/update/update-roleInCase.dto';

@Injectable()
export class RoleInCaseService {
  constructor(
    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>,
    private readonly dataSource: DataSource,
  ) {}

  async createRoleInCase(createRoleInCaseDto: CreateRoleInCaseDto) {
    try {
      const roleResponse =
        this.RoleInCaseRepository.create(createRoleInCaseDto);
      return await this.RoleInCaseRepository.save(roleResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    if (!repository) {
      data = await this.RoleInCaseRepository.findOneBy({
        id,
      });
    } else {
      data = await repository.findOneBy({
        id,
      });
    }
    if (!data) throw new NotFoundException('Register was not found');
    return data;
  }

  async updateRoleInCase(id: string, updateRoleInCase: UpdateRoleInCaseDto) {
    try {
      const roleInCaseUpdated = await this.RoleInCaseRepository.preload({
        id,
        ...updateRoleInCase,
      });
      return await this.RoleInCaseRepository.save(roleInCaseUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async removeRoleInCase(id: string) {
    try {
      await this.dataSource
        .getRepository(RoleInCase)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El Rol id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
