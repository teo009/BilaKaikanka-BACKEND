import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { AcademicLevel } from '../entities/';
import { CreateAcademicLevel } from '../dto/create/';
import { UpdateAcademicLevelDto } from '../dto/update/';

@Injectable()
export class AcademicLevelService {
  constructor(
    @InjectRepository(AcademicLevel)
    private readonly AcademicLevelRepository: Repository<AcademicLevel>,
    private readonly dataSource: DataSource,
  ) {}

  async createAcademicLevel(createAcademicLevel: CreateAcademicLevel) {
    try {
      const academicLevelResponse =
        this.AcademicLevelRepository.create(createAcademicLevel);
      return await this.AcademicLevelRepository.save(academicLevelResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async updateAcademicLevel(
    id: string,
    updateAcademicLevelDto: UpdateAcademicLevelDto,
  ) {
    try {
      const academicLevelUpdated = await this.AcademicLevelRepository.preload({
        id,
        ...updateAcademicLevelDto,
      });
      return await this.AcademicLevelRepository.save({
        ...academicLevelUpdated,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async removeAcademicLevel(id: string) {
    try {
      await this.dataSource
        .getRepository(AcademicLevel)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El Nivel Académico id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
