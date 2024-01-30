import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { RoleInCase } from './entities/roleInCase.entity';
import { VictimRealationship } from './entities/VictimRelationship.entity';
import { Career } from './entities/Career.entity';
import { Workplace } from './entities/Workplace.entity';
import { JobPosition } from './entities/jobPosition.entity';
import { AcademicLevel } from './entities/AcademicLevel.entity';
import { RegionalCenter } from './entities/regionalCenter.entity';
import { Municipality } from './entities/municipality.entity';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [
    TypeOrmModule.forFeature([ 
      RoleInCase, 
      VictimRealationship, 
      Career, 
      Workplace,
      JobPosition,
      AcademicLevel,
      RegionalCenter,
      Municipality,
    ])
  ]
})
export class CommonModule {}
