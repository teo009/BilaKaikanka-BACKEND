import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateIdentityType } from '../dto/create/create-identityType.dto';
import { UpdateIdentityType } from '../dto/update/update-identityType.dto';
import { IdentityType } from '../entities/IdentityType.entity';

@Injectable()
export class IdentityTypeService {
  constructor(
    @InjectRepository(IdentityType)
    private readonly IdentityTypeRepository: Repository<IdentityType>,
    private readonly dataSource: DataSource,
  ) {}

  async createIdentityType(createIdentityType: CreateIdentityType) {
    try {
      const identityTypeResponse =
        this.IdentityTypeRepository.create(createIdentityType);
      return await this.IdentityTypeRepository.save(identityTypeResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async updateIdentityType(
    id: string,
    updateIdentityTypeDto: UpdateIdentityType,
  ) {
    try {
      const identityTypeUpdated = await this.IdentityTypeRepository.preload({
        id,
        ...updateIdentityTypeDto,
      });
      return await this.IdentityTypeRepository.save(identityTypeUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async removeIdentityType(id: string) {
    try {
      await this.dataSource
        .getRepository(IdentityType)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El Tipo de identidad id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
