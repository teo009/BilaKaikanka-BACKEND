import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CasesService, CasePersonService } from './services/';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CreateCasePersonDto } from './dto/create-casePerson.dto';
import { CreateViolencetypeDto } from './dto/create-violencetype.dto';

@Controller('cases')
export class CasesController {

  constructor(
    private readonly casesService: CasesService,
    private readonly casePersonService: CasePersonService
  ) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.casesService.createAcase(createCaseDto);
  }

  @Post('case-has-person')
  createCasePeople(@Body() CreateCasePerson: CreateCasePersonDto) {
    return this.casePersonService.createCasePerson(CreateCasePerson);
  }

  @Post('case-has-violencetype')
  createCaseViolencetype(
    @Body() 
    createViolencetype: CreateViolencetypeDto
  ) {
    return this.casesService.creteViolencetype(createViolencetype);
  }

  @Get()
  findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.casesService.update(+id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(+id);
  }
}
