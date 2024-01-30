import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CommonService } from './common.service';
import { UpdateCommonDto } from './dto/update-common.dto';
import { CreateRoleInCaseDto } from './dto/create-roleInCase.dto';
import { CreateVictimRelationship } from './dto/create-victimRelationship';
import { CreateCareerDto } from './dto/create-career.dto';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { CreateJobPositionDto } from './dto/create-jobPosition.dto';
import { CreateAcademicLevel } from './dto/create-AcademicLevel.dto';
import { CreateRegionalCenter } from './dto/create-regionalCenter.dto';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('role-in-case')
  create(@Body() createRoleInCaseDto: CreateRoleInCaseDto) {
    return this.commonService.createArole(createRoleInCaseDto);
  }

  @Post('victim-relationship')
  cretateVictimRelationship(
    @Body() createVictimRelationship: CreateVictimRelationship
  ) {
    return this.commonService.createAvictimRelationship(
      createVictimRelationship
    ); 
  }

  @Post('career')
  createCareer(@Body() createCareer: CreateCareerDto) {
    return this.commonService.createAcareer(createCareer)
  }

  @Post('workplace')
  createWorkplace(@Body() createWorkplace: CreateWorkplaceDto) {
    return this.commonService.createWorkplace(createWorkplace);
  }

  @Post('jobposition')
  createJobPosition(@Body() createJobPosition: CreateJobPositionDto) {
    return this.commonService.createJobPosition(createJobPosition);
  }

  @Post('academiclevel')
  createAcademicLevel(@Body() createAcademicLevel: CreateAcademicLevel) {
    return this.commonService.createAcademicLevel(createAcademicLevel);
  }

  @Post('regionalcenter')
  createRegionalCenter(@Body() createRegionalCenter: CreateRegionalCenter) {
    return this.commonService.createRegionalCenter(createRegionalCenter);
  }

  @Post('municipality') 
  createMunicipality(@Body() createMunicipality: CreateMunicipalityDto) {
    return this.commonService.createMunicipality(createMunicipality);
  }

  @Get()
  findAll() {
    return this.commonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, @Body() updateCommonDto: UpdateCommonDto
  ) {
    return this.commonService.update(+id, updateCommonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonService.remove(+id);
  }
}
