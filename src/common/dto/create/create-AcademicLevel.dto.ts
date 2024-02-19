import { IsString } from "class-validator";


export class CreateAcademicLevel {

  @IsString()
  academicLevel: string;

}