import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Workplace } from '../entities/Workplace.entity';
import { CreateWorkplaceDto } from '../dto/create/create-workplace.dto';
import { UpdateWorkplaceDto } from '../dto/update/update-workplace.dto';

@Injectable()
export class WorkPlaceService {
  constructor(
    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,
    private readonly dataSource: DataSource,
  ) {}

  async createWorkplace(createWorkplace: CreateWorkplaceDto) {
    try {
      const workplaceResponse =
        this.WorkplaceRepository.create(createWorkplace);
      return await this.WorkplaceRepository.save(workplaceResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    if (!repository) {
      data = await this.WorkplaceRepository.findOneBy({
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

  async updateWorkplace(id: string, updateWorkplaceDto: UpdateWorkplaceDto) {
    try {
      const workplaceUpdated = await this.WorkplaceRepository.preload({
        id,
        ...updateWorkplaceDto,
      });
      return await this.WorkplaceRepository.save(workplaceUpdated);
    } catch (error) {
      console.log(error);
    }
    return { id, updateWorkplaceDto };
  }

  async removeWorkplace(id: string) {
    try {
      await this.dataSource
        .getRepository(Workplace)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El Centro de trabajo id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
