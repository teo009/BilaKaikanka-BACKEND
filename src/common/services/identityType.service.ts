import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CommonService } from './common.service';
import { IdentityType } from '../entities/IdentityType.entity';
import { CreateIdentityType } from '../dto/create/create-identityType.dto';
import { UpdateIdentityType } from '../dto/update/update-identityType.dto';

@Injectable()
export class IdentityTypeService {
  constructor(
    @InjectRepository(IdentityType)
    private readonly IdentityTypeRepository: Repository<IdentityType>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createIdentityType(
    createIdentityType: CreateIdentityType,
  ): Promise<IdentityType> {
    try {
      const identityTypeResponse =
        this.IdentityTypeRepository.create(createIdentityType);
      return await this.IdentityTypeRepository.save(identityTypeResponse);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<IdentityType>> {
    try {
      const response = await this.IdentityTypeRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `No data found, its seems that "identity type" schema is empty`,
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<IdentityType> {
    return this.commonService.getOne(id, this.IdentityTypeRepository);
  }

  async updateIdentityType(
    id: string,
    updateIdentityTypeDto: UpdateIdentityType,
  ): Promise<IdentityType> {
    try {
      const identityTypeUpdated = await this.IdentityTypeRepository.preload({
        id,
        ...updateIdentityTypeDto,
      });
      if (!identityTypeUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `Identity type to update not found`,
        });
      return await this.IdentityTypeRepository.save(identityTypeUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeIdentityType(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(IdentityType)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "identity - type" found to remove`,
          })
        : `Identity type with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async deleteAll() {
    const deleteQuery = this.IdentityTypeRepository.createQueryBuilder('it');
    try {
      return await deleteQuery.delete().where({}).execute();
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
