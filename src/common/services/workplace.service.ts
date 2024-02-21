import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workplace } from "../entities/Workplace.entity";
import { Repository } from "typeorm";
import { CreateWorkplaceDto } from "../dto/create/create-workplace.dto";
import { UpdateWorkplaceDto } from "../dto/update/update-workplace.dto";

@Injectable()
export class WorkPlaceService {

  constructor(

    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,

  ) {}

  async createWorkplace(createWorkplace: CreateWorkplaceDto) {
    try {
      const workplaceResponse = this.WorkplaceRepository.create(createWorkplace);
      return await this.WorkplaceRepository.save(workplaceResponse);
    } catch (error) { console.log(error) }
  }

  async updateWorkplace(id: string, updateWorkplaceDto: UpdateWorkplaceDto) {
    try {
      const workplaceUpdated = await this.WorkplaceRepository.preload(
        { id, ...updateWorkplaceDto }
      );
      return await this.WorkplaceRepository.save(workplaceUpdated);
    } catch(error) { console.log(error); }
    return { id, updateWorkplaceDto };
  }

}