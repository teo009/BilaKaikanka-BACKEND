import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCaseDto {
  @IsNumber()
  @IsPositive()
  code: number;

  @IsNumber()
  @IsPositive()
  case_number: number;

  @IsString()
  @MinLength(10)
  narration: string;

  @IsString()
  victim_story: string;

  @IsString()
  aggressor_story: string;

  @IsString()
  @MinLength(3)
  place_of_events: string;

  @IsString() //Check this later
  occurrence_time: string;

  @IsUUID()
  regionalCenter: string;

  @IsUUID()
  municipality: string;

  @IsDate()
  @Type(() => Date)
  occurrence_date: Date; //save occurrence_hour too

  @IsDate()
  @Type(() => Date)
  reception_date: Date; //save reception_hour too
}
