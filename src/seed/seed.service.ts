import { Injectable } from '@nestjs/common';
import {
  identityTypeSeed,
  regionalCentersSeed,
  trackingStatusSeed,
} from './data/';
import {
  CommonService,
  IdentityTypeService,
  RegionalCenterService,
  TrackingStatusService,
} from 'src/common/services';

@Injectable()
export class SeedService {
  constructor(
    private readonly regionalCenterService: RegionalCenterService,
    private readonly trackingStatusService: TrackingStatusService,
    private readonly identityTypeService: IdentityTypeService,
    private readonly commonService: CommonService,
  ) {}

  async runSeed() {
    this.insertIdentityType();
    this.insertTrackingStatus();
    this.insertRegionalCenters();
    return `Seed executed successfully`;
  }

  private async insertRegionalCenters() {
    await this.regionalCenterService.deleteAll();
    const RCsSeed = regionalCentersSeed.regionalCenters;
    const insertPromises = [];
    RCsSeed.forEach((regionalCenter) => {
      insertPromises.push(
        this.regionalCenterService.createRegionalCenter(regionalCenter),
      );
    });
    try {
      await Promise.all(insertPromises);
      return `Regional Centers from seed executed succesfully`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  private async insertTrackingStatus() {
    await this.trackingStatusService.deleteAll();
    const TSsSeed = trackingStatusSeed.trackingStatus;
    const insertTSPromises = [];
    TSsSeed.forEach((trackingStatus) => {
      insertTSPromises.push(this.trackingStatusService.create(trackingStatus));
    });
    try {
      await Promise.all(insertTSPromises);
      return `Tracking status from seed executed succesfully`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  private async insertIdentityType() {
    await this.identityTypeService.deleteAll();
    const ITSeed = identityTypeSeed.identityType;
    const insertITpromises = [];
    ITSeed.forEach((identityType) => {
      insertITpromises.push(
        this.identityTypeService.createIdentityType(identityType),
      );
    });
    try {
      await Promise.all(insertITpromises);
      return `Identity Type from seed executed succesfully`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
