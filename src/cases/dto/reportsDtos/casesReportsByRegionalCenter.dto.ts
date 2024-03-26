import { IsString, Matches } from 'class-validator';

export class CasesReportsByRegionalCenterDto {
  @IsString()
  @Matches(/^(Nueva Guinea|Bluefields|Las Minas|Bilwi)$/, {
    message:
      '(Error) Regional Center must be (Nueva Guinea|Bluefields|Las Minas|Bilwi)',
  })
  regionalCenter: string;
}
