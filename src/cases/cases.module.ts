import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Case, CasePerson, CaseTracking } from './entities/';
import { CasesController } from './cases.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Person } from 'src/people/entities/person.entity';
import { CaseViolence } from './entities/caseViolenctetype.entity';
import { CommonModule } from 'src/common/common.module';
import { CaseReportsController, CasePivotsController } from './controllers/';
import { CasesReportsService } from './services/reports/casesReports.service';

import {
  CasesService,
  CasePersonService,
  CaseViolenceTypeService,
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
} from 'src/common/entities/';

@Module({
  controllers: [
    CasesController,
    CaseReportsController,
    CasePivotsController
  ],
  providers: [
    CasesService,
    CasePersonService,
    CaseViolenceTypeService,
    CasesReportsService,
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
    ]),
    AuthModule,
    CommonModule,
  ],
  exports: [CasesService],
})
export class CasesModule {}
