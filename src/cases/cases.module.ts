import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Case, CasePerson } from './entities/';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Person } from 'src/people/entities/person.entity';
import { RoleInCase } from 'src/common/entities/roleInCase.entity';
import { VictimRealationship } from 'src/common/entities/VictimRelationship.entity';
import { Career } from 'src/common/entities/Career.entity';
import { Workplace } from 'src/common/entities/Workplace.entity';
import { JobPosition } from 'src/common/entities/jobPosition.entity';
import { AcademicLevel } from 'src/common/entities/AcademicLevel.entity';
import { RegionalCenter } from 'src/common/entities/regionalCenter.entity';
import { Municipality } from 'src/common/entities/municipality.entity';
import { CaseViolence } from './entities/case-violenctetype.entity';

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  imports: [
    TypeOrmModule.forFeature([
      Case, 
      CasePerson, 
      CaseViolence,
      Person, 
      RoleInCase, 
      VictimRealationship, 
      Career, 
      Workplace,
      JobPosition,
      AcademicLevel,
      RegionalCenter,
      Municipality,
    ]),
    AuthModule
  ],
  exports: [CasesService]
})
export class CasesModule {}
