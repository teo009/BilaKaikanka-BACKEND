import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
    @InjectRepository(CaseTracking)
    private readonly CaseTrackingRepository: Repository<CaseTracking>,

    @InjectRepository(TrackingStatus)
    private readonly TrackingStatusRepository: Repository<TrackingStatus>,

    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    private readonly commonService: CommonService,
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
      const toUpdate = await this.CaseTrackingRepository.preload({ id });
      if (!toUpdate)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'No se encontró caseTracking para actualizar',
        });

      let trackingStatusUpdated: object;
      if (updateCaseTracking.trackingStatusId) {
        trackingStatusUpdated = await this.commonService.getOne(
          updateCaseTracking.trackingStatusId,
          this.TrackingStatusRepository,
        );
      }

      /*let caseUpdated: object;
      if (updateCaseTracking.caseId) {
        caseUpdated = await this.commonService.getOne(
          updateCaseTracking.caseId,
          this.CaseRepository,
        );
      }*/

      return await this.CaseTrackingRepository.save({
        ...updateCaseTracking,
        trackingStatus: trackingStatusUpdated,
        //case: updateCaseTracking.caseId,
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
