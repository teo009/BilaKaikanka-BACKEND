import { IsString } from 'class-validator';

export class CreateAcademicLevel {
  @IsString()
  name: string;
}
