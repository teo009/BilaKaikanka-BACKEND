import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Case, CasePerson, CaseTracking } from './entities/';
import { CasesController } from './controllers/cases.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Person } from 'src/people/entities/person.entity';
import { CaseViolence } from './entities/caseViolenctetype.entity';
import { CommonModule } from 'src/common/common.module';
import { CaseReportsController, CasePivotsController } from './controllers/';
import { CasesReportsService } from './services/casesReports.service';

import {
  CasesService,
  CasePersonService,
  CaseViolenceTypeService,
  CasePivotService,
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
  TrackingStatus,
  PsychologicalReport,
} from 'src/common/entities/';

@Module({
  controllers: [CasesController, CaseReportsController, CasePivotsController],
  providers: [
    CasesService,
    CasePersonService,
    CaseViolenceTypeService,
    CasesReportsService,
    CasePivotService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Case,
      CasePerson,
      CaseViolence,
      CaseTracking,
      Person,
      RoleInCase,
      VictimRelationship,
      Career,
      Workplace,
      JobPosition,
      AcademicLevel,
      RegionalCenter,
      Municipality,
      ViolenceType,
      TrackingStatus,
      PsychologicalReport,
    ]),
    AuthModule,
    CommonModule,
  ],
  exports: [CasesService],
})
export class CasesModule {}
