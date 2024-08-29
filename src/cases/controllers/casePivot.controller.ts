import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  CreateCaseTrackingDto,
  UpdateCaseTrackingDto,
} from '../dto/caseTracking';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CasePivotService } from '../services';

@Controller('cases-to')
export class CasePivotsController {
  constructor(private readonly CasePivotService: CasePivotService) {}

  @Post('case-tracking')
  createCaseTracking(@Body() caseTracking: CreateCaseTrackingDto) {
    return this.CasePivotService.createCaseTracking(caseTracking);
  }

  @Get('case-tracking/:id')
  getOneCaseTracking(@Param('id', ParseUUIDPipe) id: string) {
    return this.CasePivotService.getOneCaseTracking(id);
  }

  @Patch('case-tracking/:id')
  updateCaseTracking(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCaseTracking: UpdateCaseTrackingDto,
  ) {
    return this.CasePivotService.updateCaseTracking(id, updateCaseTracking);
  }
}
