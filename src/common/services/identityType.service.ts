import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IdentityType } from "../entities/IdentityType.entity";
import { Repository } from "typeorm";
import { CreateIdentityType } from "../dto/create/create-identityType.dto";
import { UpdateIdentityType } from "../dto/update/update-identityType.dto";


@Injectable()
export class IdentityTypeService {

  constructor(

    @InjectRepository(IdentityType)
    private readonly IdentityTypeRepository: Repository<IdentityType>

  ) {}

  async createIdentityType(createIdentityType: CreateIdentityType) {
    try {
      const identityTypeResponse = this.IdentityTypeRepository.create(createIdentityType);
      return await this.IdentityTypeRepository.save(identityTypeResponse);
    } catch (error) { console.log(error) }
  }

  async updateIdentityType(id: string, updateIdentityTypeDto: UpdateIdentityType) {
    try {
      const identityTypeUpdated = await this.IdentityTypeRepository.preload(
        { id, ...updateIdentityTypeDto }
      );
      return await this.IdentityTypeRepository.save(identityTypeUpdated);
    } catch(error) { console.log(error); }
  }

}