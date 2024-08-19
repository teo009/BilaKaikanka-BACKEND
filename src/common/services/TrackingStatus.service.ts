import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { TrackingStatus } from "../entities";
import { CreateTrackingStatusTypeDto } from "../dto/create";
import { Repository } from "typeorm";
import { CommonService } from "./common.service";

@Injectable()
export class TrackingStatusService {
  constructor(
    @InjectRepository(TrackingStatus)
    private readonly TrackingStatusRepository: Repository<TrackingStatus>,
    private readonly commonService: CommonService,
  ) {}

  async createTrackingStatus(
    trackingStatusName: CreateTrackingStatusTypeDto
  ): Promise<TrackingStatus> {
    try {
      const response = this.TrackingStatusRepository.create(trackingStatusName);
      return await this.TrackingStatusRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}