import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CommonController } from './common.controller';

import {
  AcademicLevelService,
  CareerService,
  CommonService,
  IdentityTypeService,
  JobPositionService,
  MunicipalityService,
  RegionalCenterService,
  RoleInCaseService,
  VictimRelationshipService,
  ViolenceTypeService,
  WorkPlaceService,
} from './services/';
import {
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
} from './entities/';

@Module({
  controllers: [CommonController],
  providers: [
    CommonService,
    AcademicLevelService,
    RoleInCaseService,
    VictimRelationshipService,
    CareerService,
    WorkPlaceService,
    JobPositionService,
    RegionalCenterService,
    MunicipalityService,
    ViolenceTypeService,
    IdentityTypeService,
  ],
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
    ]),
  ],
  exports: [CommonService],
})
export class CommonModule {}
