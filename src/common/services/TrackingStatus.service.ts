import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TrackingStatus } from '../entities';
import { CreateTrackingStatusTypeDto } from '../dto/create';
import { Repository } from 'typeorm';
import { CommonService } from './common.service';

@Injectable()
export class TrackingStatusService {
  constructor(
    @InjectRepository(TrackingStatus)
    private readonly TrackingStatusRepository: Repository<TrackingStatus>,
    private readonly commonService: CommonService,
  ) {}

  async create(
    trackingStatusName: CreateTrackingStatusTypeDto,
  ): Promise<TrackingStatus> {
    try {
      const response = this.TrackingStatusRepository.create(trackingStatusName);
      return await this.TrackingStatusRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Array<TrackingStatus>> {
    try {
      const response = await this.TrackingStatusRepository.find();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No se encontraron datos, al parecer la tabla de estados está vacía',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
