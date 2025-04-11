import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { CommonController } from './common.controller';

import {
  AcademicLevelService,
  CareerService,
  CommonService,
  DocumentService,
  IdentityTypeService,
  JobPositionService,
  MunicipalityService,
  RegionalCenterService,
  RoleInCaseService,
  TrackingStatusService,
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
  Document,
  TrackingStatus,
  PsychologicalReport,
} from './entities/';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CasesModule } from 'src/cases/cases.module';

@Module({
  controllers: [CommonController],
  providers: [
    CommonService,
    DocumentService,
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
    TrackingStatusService,
  ],
  imports: [
    forwardRef(() => CasesModule),
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
      Document,
      TrackingStatus,
      PsychologicalReport,
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  exports: [
    CommonService,
    IdentityTypeService,
    AcademicLevelService,
    RegionalCenterService,
    TrackingStatusService,
  ],
})
export class CommonModule {}
