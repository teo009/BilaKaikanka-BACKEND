import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { VictimRelationship } from '../entities/VictimRelationship.entity';
import { CreateVictimRelationship } from '../dto/create/create-victimRelationship';
import { UpdateVictimRelationshipDto } from '../dto/update/update-victimRelationship.dto';
import { CommonService } from './common.service';

@Injectable()
export class VictimRelationshipService {
  constructor(
    @InjectRepository(VictimRelationship)
    private readonly VictimrelationshipRepository: Repository<VictimRelationship>,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createAvictimRelationship(
    createVictimRelationship: CreateVictimRelationship,
  ): Promise<VictimRelationship> {
    try {
      const response = this.VictimrelationshipRepository.create(
        createVictimRelationship,
      );
      return await this.VictimrelationshipRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAll(): Promise<Array<VictimRelationship>> {
    try {
      const response = await this.VictimrelationshipRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems that "victim - relationship" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<VictimRelationship> {
    return this.commonService.getOne(id, this.VictimrelationshipRepository);
  }

  async updateVictimRelationship(
    id: string,
    updateVictimRelationshipDto: UpdateVictimRelationshipDto,
  ): Promise<VictimRelationship> {
    try {
      const victimRelationshipToUpdate =
        await this.VictimrelationshipRepository.preload({
          id,
          ...updateVictimRelationshipDto,
        });
      if (!victimRelationshipToUpdate)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: `Victim relationship to update not Found`,
        });
      return await this.VictimrelationshipRepository.save(
        victimRelationshipToUpdate,
      );
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeVictimRelationship(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(VictimRelationship)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: `No "victim - relationship" found to remove`,
          })
        : `Victim relationship with id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
