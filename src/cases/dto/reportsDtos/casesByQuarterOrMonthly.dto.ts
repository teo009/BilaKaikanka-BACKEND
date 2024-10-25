import { Type } from 'class-transformer';
import { IsDate, IsString, Matches } from 'class-validator';

import { IsLongerThan } from 'src/common/decorator/isLongerThan';

export class CasesByQuarterOrMonthlyDto {
  @IsString()
  @Matches(/^(quarter|monthly)$/, {
    message: `El periodo de tiempo del reporte solo puede ser: Trimestral o Mensual`,
  })
  timePeriod: string;

  @IsDate()
  @Type(() => Date)
  @IsLongerThan('endDate', {
    message: 'La fecha de inicio no puede ser posterior a la fecha final',
  })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
