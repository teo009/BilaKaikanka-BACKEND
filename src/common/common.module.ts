import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AcademicLevelService, CommonService } from './services/';

import { CommonController } from './common.controller';
import { RoleInCase } from './entities/roleInCase.entity';
import { VictimRelationship } from './entities/VictimRelationship.entity';
import { Career } from './entities/Career.entity';
import { Workplace } from './entities/Workplace.entity';
import { JobPosition } from './entities/jobPosition.entity';
import { AcademicLevel } from './entities/AcademicLevel.entity';
import { RegionalCenter } from './entities/regionalCenter.entity';
import { Municipality } from './entities/municipality.entity';
import { ViolenceType } from './entities/violenceType.entity';
import { IdentityType } from './entities/IdentityType.entity';

@Module({
  controllers: [ CommonController ],
  providers: [ CommonService, AcademicLevelService ],
  imports: [
    TypeOrmModule.forFeature([ 
      RoleInCase, 
      VictimRelationship, 
      Career, 
      Workplace,
      JobPosition,
      AcademicLevel,
      RegionalCenter,
      Municipality,
      ViolenceType,
      IdentityType,
    ])
  ]
})
export class CommonModule {}
