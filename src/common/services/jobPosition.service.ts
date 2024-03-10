import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { JobPosition } from '../entities/jobPosition.entity';
import { CreateJobPositionDto } from '../dto/create/create-jobPosition.dto';
import { UpdateJobPositionDto } from '../dto/update/update-jobPosition.dto';
import { CommonService } from './common.service';

@Injectable()
export class JobPositionService {
  constructor(
    @InjectRepository(JobPosition)
    private readonly JobPositionRepository: Repository<JobPosition>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createJobPosition(
    createJobPosition: CreateJobPositionDto,
  ): Promise<JobPosition> {
    try {
      const response = this.JobPositionRepository.create(createJobPosition);
      return await this.JobPositionRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<JobPosition>> {
    try {
      const response = await this.JobPositionRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems that "job - position" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<JobPosition> {
    return this.commonService.getOne(id, this.JobPositionRepository);
  }

  async updateJobPosition(
    id: string,
    updateJobPosition: UpdateJobPositionDto,
  ): Promise<JobPosition> {
    try {
      const jobPositionUpdated = await this.JobPositionRepository.preload({
        id,
        ...updateJobPosition,
      });
      if (!jobPositionUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Job position to update not found',
        });
      return await this.JobPositionRepository.save(jobPositionUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeJobPosition(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(JobPosition)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: 'No "job position" found to remove',
          })
        : `The job position with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
