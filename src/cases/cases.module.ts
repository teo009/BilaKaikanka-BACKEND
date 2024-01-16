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

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  imports: [
    TypeOrmModule.forFeature([
      Case, 
      CasePerson, 
      Person, 
      RoleInCase, 
      VictimRealationship, 
      Career, 
      Workplace,
      JobPosition
    ]),
    AuthModule
  ],
  exports: [CasesService]
})
export class CasesModule {}
