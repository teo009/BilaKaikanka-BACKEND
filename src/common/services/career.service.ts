import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Career } from "../entities/Career.entity";
import { CreateCareerDto } from "../dto/create/create-career.dto";
import { UpdateCareerDto } from "../dto/update/update-career.dto";


@Injectable()
export class CareerService {

  constructor(

    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>

  ) {}

  async createAcareer(createCareer: CreateCareerDto) {
    try {
      const careerResponse = this.CareerRepository.create(createCareer);
      return await this.CareerRepository.save(careerResponse);
    } catch (error) { console.log(error) }
  }

  async updateCareer(id: string, updateCareerDto: UpdateCareerDto) {
    try { 
      const careerUpdated = await this.CareerRepository.preload({ 
        id, ...updateCareerDto 
      });
      return await this.CareerRepository.save(careerUpdated);
    } catch(error) { console.log(error); }
  }

}