import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person } from './entities/person.entity';
import { Career } from 'src/common/entities/Career.entity';
import { Workplace } from 'src/common/entities/Workplace.entity';
import { Municipality } from 'src/common/entities/municipality.entity';
import { JobPosition } from 'src/common/entities/jobPosition.entity';
import { IdentityType } from 'src/common/entities/IdentityType.entity';
import { AcademicLevel } from 'src/common/entities/AcademicLevel.entity';

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
      AcademicLevel
    ])
  ],
  exports: [PeopleService]
})
export class PeopleModule {}
