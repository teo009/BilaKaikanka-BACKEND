import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';

import { CasesReportsService } from '../services/reports/casesReports.service';
import {
  CaseReceptionFormatDto,
  CasesReportsByRegionalCenterDto,
} from '../dto/reportsDtos';

@Controller('cases-reports')
export class CaseReportsController {
  constructor(private readonly reportsService: CasesReportsService) {}

  @Get('cases-by-regionalCenter')
  getCasesReports(@Query() parameter: CasesReportsByRegionalCenterDto) {
    return this.reportsService.getCasesReportsByRegionalCenter(parameter);
  }

  @Get('cases-by-gender')
  test(@Query() parameters: { gender: string }) {
    return this.reportsService.getCasesReportsByGender(parameters);
  }

  @Get('cases-received/:id')
  getCaseReceptionFormat(
    @Param('id', ParseUUIDPipe) parameter: CaseReceptionFormatDto,
  ) {
    return this.reportsService.getCaseReceptionFormat(parameter);
  }
}
