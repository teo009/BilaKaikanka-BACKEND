import { Type } from "class-transformer";
import { IsArray, IsDate, IsString, IsUUID, MinLength } from "class-validator";

export class CreatePersonDto {

  @IsString()
  firstName: string

  @IsString()
  secondName: string
  
  @IsDate()
  @Type(() => Date)
  birthDate: Date; 

  @IsArray() //Check others validations later
  //@MinLength(8)
  phoneNumbers: number[];

  @IsString()
  homeAddress: string;

  @IsString()
  @MinLength(13)
  //@MinLength(10)
  identity: string;

  @IsUUID()
  career: string;

  @IsUUID()
  workplace: string;

  @IsUUID()
  municipality: string;

  @IsUUID()
  jobposition: string;

  @IsUUID()
  identityType: string;

  @IsUUID()
  academicLevel: string;

}
