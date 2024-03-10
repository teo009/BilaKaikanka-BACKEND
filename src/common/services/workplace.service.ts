import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Workplace } from '../entities/Workplace.entity';
import { CreateWorkplaceDto } from '../dto/create/create-workplace.dto';
import { UpdateWorkplaceDto } from '../dto/update/update-workplace.dto';
import { CommonService } from './common.service';

@Injectable()
export class WorkPlaceService {
  constructor(
    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createWorkplace(
    createWorkplace: CreateWorkplaceDto,
  ): Promise<Workplace> {
    try {
      const response = this.WorkplaceRepository.create(createWorkplace);
      return await this.WorkplaceRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<Workplace>> {
    try {
      const response = await this.WorkplaceRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'No data found, its seems that "workplace" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<Workplace> {
    return this.commonService.getOne(id, this.WorkplaceRepository);
  }

  async updateWorkplace(
    id: string,
    updateWorkplaceDto: UpdateWorkplaceDto,
  ): Promise<Workplace> {
    try {
      const workplaceUpdated = await this.WorkplaceRepository.preload({
        id,
        ...updateWorkplaceDto,
      });
      if (!workplaceUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `Workplace to update not Found`,
        });
      return await this.WorkplaceRepository.save(workplaceUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeWorkplace(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(Workplace)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "Worlplace" found to remove`,
          })
        : `Workplace with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
