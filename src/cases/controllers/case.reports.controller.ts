import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Res,
} from '@nestjs/common';

import { CasesReportsService } from '../services/reports/casesReports.service';
import {
  CasesByQuarterOrMonthlyDto,
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

  @Get('violencetype-by-regionalcenter')
  getViolenceTypeByRegionalCenter(
    @Query() parameter: { regionalCenter: string }, //validate RegionalCenter as UUID later
  ) {
    return this.reportsService.getViolenceTypeByRegionalCenter(parameter);
  }

  @Get('roleincase-relation-by-regionalcenter')
  getRoleInCaseRelation(@Query() parameter: { regionalCenter: string }) {
    return this.reportsService.getRolesRelation(parameter);
  }

  @Get('cases-by-quarter-monthly/:id')
  getCasesByQuarterMonthly(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() reportOptions: CasesByQuarterOrMonthlyDto,
  ) {
    return this.reportsService.getCasesByQuarterOrMonthly(id, reportOptions);
  }
}
