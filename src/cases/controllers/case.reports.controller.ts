import { Response } from 'express';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Res,
} from '@nestjs/common';

import { CasesReportsService } from '../services/casesReports.service';
import { CasesByQuarterOrMonthlyDto } from '../dto/reportsDtos';

@Controller('cases-reports')
export class CaseReportsController {
  constructor(private readonly reportsService: CasesReportsService) {}

  @Get('case-received/:id')
  async getCaseReceptionFormat(
    @Res() response: Response,
    @Param('id', ParseUUIDPipe) parameter: { caseId: string },
  ) {
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment;filename=Case.pdf',
    });
    response.end(await this.reportsService.getCaseReceptionFormat(parameter));
  }

  @Get('cases-by-quarter-monthly/:id')
  getCasesByQuarterMonthly(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() reportOptions: CasesByQuarterOrMonthlyDto,
  ) {
    return this.reportsService.mainReport(id, reportOptions);
  }
}
