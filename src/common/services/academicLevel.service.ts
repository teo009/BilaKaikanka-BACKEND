import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { AcademicLevel } from '../entities/';
import { CreateAcademicLevel } from '../dto/create/';
import { UpdateAcademicLevelDto } from '../dto/update/';
import { CommonService } from './common.service';

@Injectable()
export class AcademicLevelService {
  constructor(
    @InjectRepository(AcademicLevel)
    private readonly AcademicLevelRepository: Repository<AcademicLevel>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createAcademicLevel(
    createAcademicLevel: CreateAcademicLevel,
  ): Promise<AcademicLevel> {
    try {
      const response = this.AcademicLevelRepository.create(createAcademicLevel);
      return await this.AcademicLevelRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<AcademicLevel>> {
    try {
      const response = await this.AcademicLevelRepository.find();
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

  async getOne(id: string): Promise<AcademicLevel> {
    return this.commonService.getOne(id, this.AcademicLevelRepository);
  }

  async updateAcademicLevel(
    id: string,
    updateAcademicLevelDto: UpdateAcademicLevelDto,
  ): Promise<AcademicLevel> {
    try {
      const academicLevelUpdated = await this.AcademicLevelRepository.preload({
        id,
        ...updateAcademicLevelDto,
      });
      if (!academicLevelUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `Academic level to update not Found`,
        });
      return await this.AcademicLevelRepository.save({
        ...academicLevelUpdated,
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeAcademicLevel(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(AcademicLevel)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "Academic - Level" found to remove`,
          })
        : `Academic level with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async deleteAll() {
    const deleteQuery = this.AcademicLevelRepository.createQueryBuilder('al');
    try {
      return await deleteQuery.delete().where({}).execute();
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
