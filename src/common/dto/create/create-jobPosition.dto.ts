import { IsOptional, IsString } from "class-validator";

export class CreateJobPositionDto {

  @IsString()
  jobPosition: string;

}