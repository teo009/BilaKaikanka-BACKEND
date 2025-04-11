import { DataSource, Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Case, CaseTracking } from '../entities';
import { CommonService } from 'src/common/services';
import {
  CreateCaseTrackingDto,
  UpdateCaseTrackingDto,
} from '../dto/caseTracking';
import { TrackingStatus } from 'src/common/entities';

@Injectable()
export class CasePivotService {
  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,

    @InjectRepository(CaseTracking)
    private readonly CaseTrackingRepository: Repository<CaseTracking>,

    @InjectRepository(TrackingStatus)
    private readonly TrackingStatusRepository: Repository<TrackingStatus>,
  ) {}

  async createCaseTracking(
    caseTracking: CreateCaseTrackingDto,
  ): Promise<CaseTracking> {
    try {
      const response = this.CaseTrackingRepository.create({
        caseId: caseTracking.caseId,
        trackingStatusId: caseTracking.trackingStatusId,
        description: caseTracking.description,
      });
      await this.CaseTrackingRepository.save(response);
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOneCaseTracking(id: string): Promise<CaseTracking> {
    return this.commonService.getOne(id, this.CaseTrackingRepository);
  }

  async updateCaseTracking(
    id: string,
    updateCaseTracking: UpdateCaseTrackingDto,
  ): Promise<CaseTracking> {
    try {
      const caseTrackingToUpdate = await this.CaseTrackingRepository.preload({
        id,
        ...updateCaseTracking,
      });

      //Check if there is no caseTracking found in database
      if (!caseTrackingToUpdate)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'No se encontró caseTracking para actualizar',
        });

      //Update trackingStatus foreign key if is requested
      let trackingStatusUpdated: object;
      if (updateCaseTracking.trackingStatusId) {
        trackingStatusUpdated = await this.commonService.getOne(
          updateCaseTracking.trackingStatusId,
          this.TrackingStatusRepository,
        );
      }

      return await this.CaseTrackingRepository.save({
        ...caseTrackingToUpdate,
        trackingStatus: trackingStatusUpdated,
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
