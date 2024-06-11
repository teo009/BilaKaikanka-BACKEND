import { IsString } from 'class-validator';

export class CreateMunicipalityDto {
  @IsString()
  name: string;
}
