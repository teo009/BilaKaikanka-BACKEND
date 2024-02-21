import { IsString } from "class-validator";


export class CreateWorkplaceDto {

  @IsString()
  workplace: string;

}