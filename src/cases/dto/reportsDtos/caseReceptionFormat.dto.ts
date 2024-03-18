import { IsUUID } from 'class-validator';

export class CaseReceptionFormatDto {
  @IsUUID()
  caseId: string;
}
