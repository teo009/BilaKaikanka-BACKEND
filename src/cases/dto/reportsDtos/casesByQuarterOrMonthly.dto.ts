import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

import { IsLongerThan } from 'src/common/decorator/isLongerThan';

export class CasesByQuarterOrMonthlyDto {
  @IsDate()
  @Type(() => Date)
  @IsLongerThan('endDate', {
    message: 'La fecha de inicio no puede ser posterior a la fecha final',
  })
  startDate: Date;

  @IsDate() //Validate this data is not before startDate
  @Type(() => Date)
  endDate: Date;
}
