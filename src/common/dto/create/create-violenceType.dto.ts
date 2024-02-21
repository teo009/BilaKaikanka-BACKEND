import { IsString } from "class-validator";


export class CreateViolenceTypeDto {

  @IsString()
  violenceType: string;

}