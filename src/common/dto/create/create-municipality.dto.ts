import { IsString } from "class-validator";


export class CreateMunicipalityDto {

  @IsString()
  municipalityName: string;

}