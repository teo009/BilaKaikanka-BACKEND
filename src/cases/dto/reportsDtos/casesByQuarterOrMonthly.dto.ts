import { IsNumber, IsPositive, IsString, Matches, Max } from 'class-validator';

export class CasesByQuarterOrMonthlyDto {
  @IsString()
  @Matches(/^(quarter|monthly)$/, {
    message: `El periodo de tiempo del reporte solo puede ser: Trimestral o Mensual`,
  })
  timePeriod: string;

  @IsNumber()
  @IsPositive()
  @Max(12)
  exactTime: number;
}