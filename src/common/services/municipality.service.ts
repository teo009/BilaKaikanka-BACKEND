import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Municipality } from '../entities/municipality.entity';
import { CreateMunicipalityDto } from '../dto/create/create-municipality.dto';
import { UpdateMunicipalityDto } from '../dto/update/update-municipality.dto';
import { CommonService } from './common.service';

@Injectable()
export class MunicipalityService {
  constructor(
    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createMunicipality(
    createMunicipality: CreateMunicipalityDto,
  ): Promise<Municipality> {
    try {
      const response = this.MunicipalityRepository.create(createMunicipality);
      return await this.MunicipalityRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<Municipality>> {
    try {
      const response = await this.MunicipalityRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems like "municipality" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<Municipality> {
    return this.commonService.getOne(id, this.MunicipalityRepository);
  }

  async updateMunicipality(
    id: string,
    updateMunicipalityDto: UpdateMunicipalityDto,
  ): Promise<Municipality> {
    try {
      const municipalityUpdated = await this.MunicipalityRepository.preload({
        id,
        ...updateMunicipalityDto,
      });
      if (!municipalityUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Municipality to update not found',
        });
      return await this.MunicipalityRepository.save(municipalityUpdated);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeMunicipality(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(Municipality)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: 'No "Municipality" found to remove',
          })
        : `Municipality with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
