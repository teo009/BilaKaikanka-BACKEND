import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ViolenceType } from '../entities/violenceType.entity';
import { CreateViolenceTypeDto } from '../dto/create/create-violenceType.dto';
import { UpdateViolenceTypeDto } from '../dto/update/update-violenceType.dto';
import { CommonService } from './common.service';

@Injectable()
export class ViolenceTypeService {
  constructor(
    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createViolenceType(
    createViolenceType: CreateViolenceTypeDto,
  ): Promise<ViolenceType> {
    try {
      const response = this.ViolenceTypeRepository.create(createViolenceType);
      return await this.ViolenceTypeRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<ViolenceType>> {
    try {
      const response = await this.ViolenceTypeRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems that "academic - level" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<ViolenceType> {
    return this.commonService.getOne(id, this.ViolenceTypeRepository);
  }

  async updateViolenceType(
    id: string,
    updateViolenceTypeDto: UpdateViolenceTypeDto,
  ): Promise<ViolenceType> {
    try {
      const violenceTypeUpdated = await this.ViolenceTypeRepository.preload({
        id,
        ...updateViolenceTypeDto,
      });
      if (!violenceTypeUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `Academic level to update not Found`,
        });
      return await this.ViolenceTypeRepository.save(violenceTypeUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeViolenceType(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(ViolenceType)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "violence - type" found to remove`,
          })
        : `Violence type with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
