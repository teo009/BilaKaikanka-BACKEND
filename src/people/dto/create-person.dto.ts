import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreatePersonDto {

  @IsString()
  firstName: string

  @IsString()
  secondName: string
  
  @IsDate()
  @Type(() => Date)
  birthDate: Date; 

  @IsArray() //Check others validations later
  phoneNumbers: number[];

  @IsString()
  homeAddress: string;

  @IsString()
  @MinLength(13)
  //@MinLength(10)
  identity: string;

}
