import { IsString, IsUUID } from 'class-validator';

export class CreateCaseTrackingDto {
  @IsString()
  description: string;

  @IsUUID()
  caseId: string;

  @IsUUID()
  trackingStatusId: string;
}
