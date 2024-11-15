import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  secondName: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsString()
  @Matches(/^(male|female)$/, {
    message: '(Error) gender must contain (male or female)',
  })
  gender: string;

  @IsString()
  @Matches(/^(mestiza|creole|miskito|rama|garifona)$/, {
    message:
      '(Error) La etnia solo debe de contener alguna de las siguientes: (mestiza|creole|miskito|rama|garifona)',
  })
  ethnicity: string;

  @IsArray() //Check others validations later
  //@IsInt()
  //@Length(8, 8, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  phoneNumbers: number[];

  @IsString()
  @MinLength(5)
  homeAddress: string;

  @IsString()
  @MinLength(16)
  //@MinLength(10)
  identity: string;

  @IsUUID()
  career: string;

  @IsUUID()
  workplace: string;

  @IsUUID()
  municipality: string;

  @IsUUID()
  regionalCenter: string;

  @IsUUID()
  jobposition: string;

  @IsUUID()
  identityType: string;

  @IsUUID()
  academicLevel: string;
}
