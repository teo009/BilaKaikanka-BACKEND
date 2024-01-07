import { IsUUID } from "class-validator";


export class CreateCasePersonDto {
  
  @IsUUID()
  caseId: string;

  @IsUUID()
  personId: string;

}