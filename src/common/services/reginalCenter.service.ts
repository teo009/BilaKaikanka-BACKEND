import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { RegionalCenter } from '../entities/regionalCenter.entity';
import { CreateRegionalCenter } from '../dto/create/create-regionalCenter.dto';
import { UpdateRegionalCenterDto } from '../dto/update/update-regionalCenter.dto';
import { CommonService } from './common.service';

@Injectable()
export class RegionalCenterService {
  constructor(
    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createRegionalCenter(
    createRegionalCenter: CreateRegionalCenter,
  ): Promise<RegionalCenter> {
    try {
      const response =
        this.RegionalCenterRepository.create(createRegionalCenter);
      return await this.RegionalCenterRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<RegionalCenter>> {
    try {
      const response = await this.RegionalCenterRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems that "regional center" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<RegionalCenter> {
    return this.commonService.getOne(id, this.RegionalCenterRepository);
  }

  async updateRegionalCenter(
    id: string,
    updateRegionalCenterDto: UpdateRegionalCenterDto,
  ): Promise<RegionalCenter> {
    try {
      const regionalCenterUpdated = await this.RegionalCenterRepository.preload(
        {
          id,
          ...updateRegionalCenterDto,
        },
      );
      if (!regionalCenterUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Regional center to update not found',
        });
      return await this.RegionalCenterRepository.save(regionalCenterUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeRegionalCenter(id: string) {
    try {
      const response = await this.dataSource
        .getRepository(RegionalCenter)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "regional - center" found to remove`,
          })
        : `Regional center with id: ${id} has been sucessfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
