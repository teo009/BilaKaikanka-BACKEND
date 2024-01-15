import { IsOptional, IsUUID } from "class-validator";


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
  @IsOptional()
  career?: string;

}