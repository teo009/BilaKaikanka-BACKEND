import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { VictimRelationship } from '../entities/VictimRelationship.entity';
import { CreateVictimRelationship } from '../dto/create/create-victimRelationship';
import { UpdateVictimRelationshipDto } from '../dto/update/update-victimRelationship.dto';

@Injectable()
export class VictimRelationshipService {
  constructor(
    @InjectRepository(VictimRelationship)
    private readonly VictimrelationshipRepository: Repository<VictimRelationship>,
    private readonly dataSource: DataSource,
  ) {}

  async createAvictimRelationship(
    createVictimRelationship: CreateVictimRelationship,
  ) {
    try {
      const victimRelationshipResponse =
        this.VictimrelationshipRepository.create(createVictimRelationship);
      return await this.VictimrelationshipRepository.save(
        victimRelationshipResponse,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateVictimRelationship(
    id: string,
    updateVictimRelationshipDto: UpdateVictimRelationshipDto,
  ) {
    try {
      const victimRelationshipToUpdate =
        await this.VictimrelationshipRepository.preload({
          id,
          ...updateVictimRelationshipDto,
        });
      return await this.VictimrelationshipRepository.save(
        victimRelationshipToUpdate,
      );
    } catch (error) {
      console.log(error);
    }
    return { id, updateVictimRelationshipDto };
  }

  async removeVictimRelationship(id: string) {
    try {
      await this.dataSource
        .getRepository(VictimRelationship)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `La relación con la víctima id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
