import { IsUUID } from "class-validator";


export class CreateCasePersonDto {
  
  @IsUUID()
  caseId: string;

  @IsUUID()
  personId: string;

  @IsUUID()
  roleInCaseId: string;

  @IsUUID()
  victimRelationship: string;

}