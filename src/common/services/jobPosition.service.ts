import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { JobPosition } from "../entities/jobPosition.entity";
import { CreateJobPositionDto } from "../dto/create/create-jobPosition.dto";
import { UpdateJobPositionDto } from "../dto/update/update-jobPosition.dto";

@Injectable()
export class JobPositionService {

  constructor(

    @InjectRepository(JobPosition)
    private readonly JobPositionRepository: Repository<JobPosition>

  ) {}

  async createJobPosition(createJobPosition: CreateJobPositionDto) {
    try {
      const jobPositionResponse = this.JobPositionRepository.create(createJobPosition);
      return await this.JobPositionRepository.save(jobPositionResponse);
    } catch (error) { console.log(error) }
  }

  async updateJobPosition(id: string, updateJobPosition: UpdateJobPositionDto) {
    try {
      const jobPositionUpdated = await this.JobPositionRepository.preload(
        { id, ...updateJobPosition }
      );
      return await this.JobPositionRepository.save(jobPositionUpdated);
    } catch(error) { console.log(error); }
  }

}