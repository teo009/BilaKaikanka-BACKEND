import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { RegionalCenter } from '../entities/regionalCenter.entity';
import { CreateRegionalCenter } from '../dto/create/create-regionalCenter.dto';
import { UpdateRegionalCenterDto } from '../dto/update/update-regionalCenter.dto';

@Injectable()
export class RegionalCenterService {
  constructor(
    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,
    private readonly dataSource: DataSource,
  ) {}

  async createRegionalCenter(createRegionalCenter: CreateRegionalCenter) {
    try {
      const regionalCenterResponse =
        this.RegionalCenterRepository.create(createRegionalCenter);
      return await this.RegionalCenterRepository.save(regionalCenterResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return await this.RegionalCenterRepository.find();
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    if (!repository) {
      data = await this.RegionalCenterRepository.findOneBy({
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

  async updateRegionalCenter(
    id: string,
    updateRegionalCenterDto: UpdateRegionalCenterDto,
  ) {
    try {
      const regionalCenterUpdated = await this.RegionalCenterRepository.preload(
        {
          id,
          ...updateRegionalCenterDto,
        },
      );
      return await this.RegionalCenterRepository.save(regionalCenterUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async removeRegionalCenter(id: string) {
    try {
      await this.dataSource
        .getRepository(RegionalCenter)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El Centro Regional id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
