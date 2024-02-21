import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CasesService, CasePersonService, CaseViolenceTypeService } from './services/';
import { Case, CasePerson } from './entities/';
import { CasesController } from './cases.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Person } from 'src/people/entities/person.entity';
import { CaseViolence } from './entities/case-violenctetype.entity';

import { 
  RoleInCase,
  VictimRelationship,
  Career,
  Workplace,
  JobPosition,
  AcademicLevel,
  RegionalCenter,
  Municipality,
  ViolenceType
} from 'src/common/entities/';

@Module({
  controllers: [CasesController],
  providers: [CasesService, CasePersonService, CaseViolenceTypeService],
  imports: [
    TypeOrmModule.forFeature([
      Case, 
      CasePerson, 
      CaseViolence,
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
    AuthModule
  ],
  exports: [CasesService]
})
export class CasesModule {}
