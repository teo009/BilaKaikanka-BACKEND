import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleInCase } from './entities/roleInCase.entity';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [
    TypeOrmModule.forFeature([ RoleInCase ])
  ]
  //exports: [  ]
})
export class CommonModule {}
