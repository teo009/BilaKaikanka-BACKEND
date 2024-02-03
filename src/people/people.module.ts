import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person } from './entities/person.entity';
import { Career } from 'src/common/entities/Career.entity';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  imports: [
    TypeOrmModule.forFeature([ Person, Career ])
  ],
  exports: [PeopleService]
})
export class PeopleModule {}
