import { IsOptional, IsUUID } from 'class-validator';

export class CreateCasePersonDto {
  @IsUUID()
  case_id: string;

  @IsUUID()
  person_id: string;

  @IsUUID()
  roleInCase_id: string;

  @IsUUID()
  victimRelationship_id: string;

  @IsUUID()
  @IsOptional()
  career_id?: string;

  @IsUUID()
  @IsOptional()
  workplace_id?: string;

  @IsUUID()
  @IsOptional()
  jobPosition_id?: string;

  @IsUUID()
  academicLevel_id: string;
}
