import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { CasesReportsService } from '../services/reports/casesReports.service';

@Controller('cases-reports')
export class CaseReportsController {
  constructor(private readonly reportsService: CasesReportsService) {}

  @Get('cases-by-regionalCenter')
  getCasesReports(@Query() parameters: { regionalCenter: string }) {
    return this.reportsService.getCasesReportsByRegionalCenter(parameters);
  }

  @Get('cases-by-gender')
  test(@Query() parameters: { gender: string }) {
    return this.reportsService.getCasesReportsByGender(parameters);
  }

  @Get('cases-received/:id')
  getCaseReceptionFormat(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.getCaseReceptionFormat(id);
  }
}
