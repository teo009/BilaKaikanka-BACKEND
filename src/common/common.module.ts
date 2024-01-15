import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { RoleInCase } from './entities/roleInCase.entity';
import { VictimRealationship } from './entities/VictimRelationship.entity';
import { Career } from './entities/Career.entity';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [
    TypeOrmModule.forFeature([ RoleInCase, VictimRealationship, Career ])
  ]
  //exports: [  ]
})
export class CommonModule {}
