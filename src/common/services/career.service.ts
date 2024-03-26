import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Career } from '../entities/Career.entity';
import { CreateCareerDto } from '../dto/create/create-career.dto';
import { UpdateCareerDto } from '../dto/update/update-career.dto';
import { CommonService } from './common.service';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createAcareer(createCareer: CreateCareerDto): Promise<Career> {
    try {
      const careerResponse = this.CareerRepository.create(createCareer);
      return await this.CareerRepository.save(careerResponse);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<Career>> {
    try {
      const response = await this.CareerRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `No data found, its seems that "career" schema is empty`,
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<Career> {
    return this.commonService.getOne(id, this.CareerRepository);
  }

  async updateCareer(
    id: string,
    updateCareerDto: UpdateCareerDto,
  ): Promise<Career> {
    try {
      const careerUpdated = await this.CareerRepository.preload({
        id,
        ...updateCareerDto,
      });
      if (!careerUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `Career to update not Found`,
        });
      return await this.CareerRepository.save(careerUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeCareer(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(Career)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "Career" found to remove`,
          })
        : `La carrera id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
