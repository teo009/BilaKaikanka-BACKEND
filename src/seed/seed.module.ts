import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AuthModule } from '../auth/auth.module';
import { SeedController } from './seed.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, CommonModule],
})
export class SeedModule {}
