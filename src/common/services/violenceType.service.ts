import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { ViolenceType } from "../entities/violenceType.entity";
import { CreateViolenceTypeDto } from "../dto/create/create-violenceType.dto";
import { UpdateViolenceTypeDto } from "../dto/update/update-violenceType.dto";

@Injectable()
export class ViolenceTypeService {

  constructor(

    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>

  ) {}

  async createViolenceType(createViolenceType: CreateViolenceTypeDto) {
    try {
      const violenceTypeResponse = this.ViolenceTypeRepository.create(createViolenceType);
      return await this.ViolenceTypeRepository.save(violenceTypeResponse);
    } catch (error) { console.log(error) }
  }

  async updateViolenceType(id: string, updateViolenceTypeDto: UpdateViolenceTypeDto) {
    try { 
      const violenceTypeUpdated = await this.ViolenceTypeRepository.preload(
        { id, ...updateViolenceTypeDto }
      );
      return await this.ViolenceTypeRepository.save(violenceTypeUpdated);
    } catch(error) { console.log(error); }
  }

}