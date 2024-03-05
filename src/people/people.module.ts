import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person } from './entities/person.entity';
import { CommonModule } from 'src/common/common.module';

import {
  Municipality,
  JobPosition,
  IdentityType,
  AcademicLevel,
  Workplace,
  Career,
} from 'src/common/entities/';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  imports: [
    TypeOrmModule.forFeature([
      Person,
      Career,
      Workplace,
      Municipality,
      JobPosition,
      IdentityType,
      AcademicLevel,
    ]),
    CommonModule,
  ],
  exports: [PeopleService],
})
export class PeopleModule {}
