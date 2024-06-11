import { IsString } from 'class-validator';

export class CreateJobPositionDto {
  @IsString()
  name: string;
}
