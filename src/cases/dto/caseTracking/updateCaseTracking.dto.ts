import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseTrackingDto } from './createCaseTracking.dto';
import { Exclude } from 'class-transformer';

export class UpdateCaseTrackingDto extends PartialType(CreateCaseTrackingDto) {
  @Exclude()
  caseId?: string;
}
