import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Career } from '../entities/Career.entity';
import { CreateCareerDto } from '../dto/create/create-career.dto';
import { UpdateCareerDto } from '../dto/update/update-career.dto';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,
    private readonly dataSource: DataSource,
  ) {}

  async createAcareer(createCareer: CreateCareerDto) {
    try {
      const careerResponse = this.CareerRepository.create(createCareer);
      return await this.CareerRepository.save(careerResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return await this.CareerRepository.find();
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    if (!repository) {
      data = await this.CareerRepository.findOneBy({
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

  async updateCareer(id: string, updateCareerDto: UpdateCareerDto) {
    try {
      const careerUpdated = await this.CareerRepository.preload({
        id,
        ...updateCareerDto,
      });
      return await this.CareerRepository.save(careerUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async removeCareer(id: string) {
    try {
      await this.dataSource
        .getRepository(Career)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `La carrera id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
