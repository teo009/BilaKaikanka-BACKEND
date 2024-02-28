import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Municipality } from '../entities/municipality.entity';
import { CreateMunicipalityDto } from '../dto/create/create-municipality.dto';
import { UpdateMunicipalityDto } from '../dto/update/update-municipality.dto';

@Injectable()
export class MunicipalityService {
  constructor(
    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,
    private readonly dataSource: DataSource,
  ) {}

  async createMunicipality(createMunicipality: CreateMunicipalityDto) {
    try {
      const municipalityResponse =
        this.MunicipalityRepository.create(createMunicipality);
      return await this.MunicipalityRepository.save(municipalityResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    if (!repository) {
      data = await this.MunicipalityRepository.findOneBy({
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

  async updateMunicipality(
    id: string,
    updateMunicipalityDto: UpdateMunicipalityDto,
  ) {
    try {
      const municipalityUpdated = await this.MunicipalityRepository.preload({
        id,
        ...updateMunicipalityDto,
      });
      return await this.MunicipalityRepository.save(municipalityUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async removeMunicipality(id: string) {
    try {
      await this.dataSource
        .getRepository(Municipality)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El municipio id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
