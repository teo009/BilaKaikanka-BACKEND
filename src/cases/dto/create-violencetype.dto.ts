import { IsUUID } from "class-validator";


export class CreateViolencetypeDto {

  @IsUUID()
  case: string;

  @IsUUID()
  violenceType: string;

}