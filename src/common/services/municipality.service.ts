import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Municipality } from "../entities/municipality.entity";
import { CreateMunicipalityDto } from "../dto/create/create-municipality.dto";
import { UpdateMunicipalityDto } from "../dto/update/update-municipality.dto";

@Injectable()
export class MunicipalityService {

  constructor(
    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>
  ) {}

  async createMunicipality(createMunicipality: CreateMunicipalityDto) {
    try {
      const municipalityResponse = this.MunicipalityRepository.create(createMunicipality);
      return await this.MunicipalityRepository.save(municipalityResponse);
    } catch (error) { console.log(error) }
  }

  async updateMunicipality(id: string, updateMunicipalityDto: UpdateMunicipalityDto) {
    try {
      const municipalityUpdated = await this.MunicipalityRepository.preload({
        id, ...updateMunicipalityDto
      });
      return await this.MunicipalityRepository.save(municipalityUpdated);
    } catch(error) { console.log(error); }
  }

}