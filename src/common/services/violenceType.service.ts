import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ViolenceType } from '../entities/violenceType.entity';
import { CreateViolenceTypeDto } from '../dto/create/create-violenceType.dto';
import { UpdateViolenceTypeDto } from '../dto/update/update-violenceType.dto';

@Injectable()
export class ViolenceTypeService {
  constructor(
    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>,
    private readonly dataSource: DataSource,
  ) {}

  async createViolenceType(createViolenceType: CreateViolenceTypeDto) {
    try {
      const violenceTypeResponse =
        this.ViolenceTypeRepository.create(createViolenceType);
      return await this.ViolenceTypeRepository.save(violenceTypeResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return await this.ViolenceTypeRepository.find();
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let data: any;
    if (!repository) {
      data = await this.ViolenceTypeRepository.findOneBy({
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

  async updateViolenceType(
    id: string,
    updateViolenceTypeDto: UpdateViolenceTypeDto,
  ) {
    try {
      const violenceTypeUpdated = await this.ViolenceTypeRepository.preload({
        id,
        ...updateViolenceTypeDto,
      });
      return await this.ViolenceTypeRepository.save(violenceTypeUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async removeViolenceType(id: string) {
    try {
      await this.dataSource
        .getRepository(ViolenceType)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El tipo de violencia id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
