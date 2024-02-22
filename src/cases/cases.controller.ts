import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { CasesService, CasePersonService, CaseViolenceTypeService } from './services/';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CreateCasePersonDto } from './dto/casePerson/create-casePerson.dto';
import { CreateViolencetypeDto } from './dto/create-violencetype.dto';
import { UpdateCasePersonDto } from './dto/casePerson/update-casePerson.dto';
import { UpdateCaseViolencetypeDto } from './dto/caseViolencetype/update-caseViolencetype.dto';

@Controller('cases')
export class CasesController {

  constructor(
    private readonly casesService: CasesService,
    private readonly casePersonService: CasePersonService,
    private readonly caseViolenceType: CaseViolenceTypeService
  ) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.casesService.createAcase(createCaseDto);
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
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCaseDto: UpdateCaseDto
  ) {
    return this.casesService.update(id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(+id);
  }

  //CASE HAS VIOLENCE TYPE PIVOTE
  @Post('case-has-violencetype')
  createCaseViolencetype(
    @Body() 
    createViolencetype: CreateViolencetypeDto
  ) {
    return this.caseViolenceType.createCaseViolenceType(createViolencetype);
  }

  @Patch('case-has-violencetype/:id')
  updateCaseViolencetype(
    @Param('id', ParseUUIDPipe) id: string, @Body()
    updateCaseViolencetype: UpdateCaseViolencetypeDto
  ) {
    return this.caseViolenceType.updateCaseViolenceType(
      id, updateCaseViolencetype
    );
  }

  //CASE HAS PERSON PIVOTE TABLE
  @Post('case-has-person')
  createCasePeople(@Body() CreateCasePerson: CreateCasePersonDto) {
    return this.casePersonService.createCasePerson(CreateCasePerson);
  }

  @Patch('case-has-person/:id')
  updateCasePerson(
    @Param('id', ParseUUIDPipe) id: string, @Body() 
    updateCasePersonDto: UpdateCasePersonDto
  ) {
    return this.casePersonService.updateCasePerson(id, updateCasePersonDto);
  }

  @Delete('case-has-person/:id')
  deleteCasePerson(@Param('id', ParseUUIDPipe) id: string) {
    return this.casePersonService.removeCasePerson(id);
  }

}
