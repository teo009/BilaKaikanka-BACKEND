import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { JobPosition } from '../entities/jobPosition.entity';
import { CreateJobPositionDto } from '../dto/create/create-jobPosition.dto';
import { UpdateJobPositionDto } from '../dto/update/update-jobPosition.dto';

@Injectable()
export class JobPositionService {
  constructor(
    @InjectRepository(JobPosition)
    private readonly JobPositionRepository: Repository<JobPosition>,
    private readonly dataSource: DataSource,
  ) {}

  async createJobPosition(createJobPosition: CreateJobPositionDto) {
    try {
      const jobPositionResponse =
        this.JobPositionRepository.create(createJobPosition);
      return await this.JobPositionRepository.save(jobPositionResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return await this.JobPositionRepository.find();
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    if (!repository) {
      data = await this.JobPositionRepository.findOneBy({
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

  async updateJobPosition(id: string, updateJobPosition: UpdateJobPositionDto) {
    try {
      const jobPositionUpdated = await this.JobPositionRepository.preload({
        id,
        ...updateJobPosition,
      });
      return await this.JobPositionRepository.save(jobPositionUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async removeJobPosition(id: string) {
    try {
      await this.dataSource
        .getRepository(JobPosition)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El Puesto de trabajo id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
