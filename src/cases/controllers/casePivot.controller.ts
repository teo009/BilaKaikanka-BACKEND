import { Body, Controller, Post } from "@nestjs/common";
import { CreateCaseTrackingDto } from "../dto/caseTracking";

@Controller('cases-to')
export class CasePivotsController {
  constructor(

  ) {}

  @Post('case-tracking')
  createCaseTracking(@Body() caseTracking: CreateCaseTrackingDto) {
    return { caseTracking };
  }
}