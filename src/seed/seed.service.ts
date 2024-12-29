import { Injectable } from '@nestjs/common';
import { RegionalCenterService } from 'src/common/services';
import { regionalCentersSeed } from './data/regionalCenters.seed';

@Injectable()
export class SeedService {
  constructor(private readonly regionalCenterService: RegionalCenterService) {}

  async runSeed() {
    this.insertRegionalCenters();
    return `Seed executed successfully`;
  }

  private async insertRegionalCenters() {
    //await this.regionalCenterService.deleteAll(); //This have to work
    const RCsSeed = regionalCentersSeed.regionalCenters;
    const insertPromises = [];
    RCsSeed.forEach((regionalCenter) => {
      insertPromises.push(
        this.regionalCenterService.createRegionalCenter(regionalCenter),
      );
    });
    await Promise.all(insertPromises);
    return true;
  }
}
