import { IsString, IsUUID } from "class-validator";

export class CreateCaseTrackingDto {
  @IsString()
  description: string;

  @IsUUID()
  case: string;

  @IsUUID()
  trackingStatus: string;
}