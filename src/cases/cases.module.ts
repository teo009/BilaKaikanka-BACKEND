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

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  imports: [
    TypeOrmModule.forFeature([Case, CasePerson, Person, RoleInCase, VictimRealationship, Career]),
    AuthModule
  ],
  exports: [CasesService]
})
export class CasesModule {}
