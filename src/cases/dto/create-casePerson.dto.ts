import { IsUUID } from "class-validator";


export class CreateCasePersonDto {
  
  @IsUUID()
  caseId: string;

  @IsUUID()
  person: string;

  @IsUUID()
  roleInCase: string;

  @IsUUID()
  victimRelationship: string;

  @IsUUID()
  career: string;

}