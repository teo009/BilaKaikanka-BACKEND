import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { AcademicLevelService, CommonService } from './services';

import { UpdateCommonDto } from './dto/update-common.dto';
import { CreateRoleInCaseDto } from './dto/create-roleInCase.dto';
import { CreateVictimRelationship } from './dto/create-victimRelationship';
import { CreateCareerDto } from './dto/create-career.dto';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { CreateJobPositionDto } from './dto/create-jobPosition.dto';
import { CreateAcademicLevel } from './dto/create/create-AcademicLevel.dto';
import { CreateRegionalCenter } from './dto/create-regionalCenter.dto';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { CreateViolenceTypeDto } from './dto/create-violenceType.dto';
import { CreateIdentityType } from './dto/create-identityType.dto';
import { UpdateAcademicLevelDto } from './dto/update/update-academicLevel.dto';

@Controller('common')
export class CommonController {

  constructor(
    private readonly commonService: CommonService,
    private readonly AcademicLevelService: AcademicLevelService,
  ) {}

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

  @Post('regionalcenter')
  createRegionalCenter(@Body() createRegionalCenter: CreateRegionalCenter) {
    return this.commonService.createRegionalCenter(createRegionalCenter);
  }

  @Post('municipality') 
  createMunicipality(@Body() createMunicipality: CreateMunicipalityDto) {
    return this.commonService.createMunicipality(createMunicipality);
  }

  @Post('violencetype')
  createViolenceType(@Body() createViolenceType: CreateViolenceTypeDto) {
    return this.commonService.createViolenceType(createViolenceType);
  }

  @Post('identitytype')
  createIdentityType(@Body() createIdentityType: CreateIdentityType) {
    return this.commonService.createIdentityType(createIdentityType);
  }

  @Get()
  findAll() {
    return this.commonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOne(+id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonService.remove(+id);
  }

  //ACADEMIC LEVEL
  @Post('academiclevel')
  createAcademicLevel(
    @Body() createAcademicLevel: CreateAcademicLevel
  ) {
    return this.AcademicLevelService.createAcademicLevel(
      createAcademicLevel
    );
  }
  @Patch('academiclevel/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string, @Body() 
    updateAcademicLevelDto: UpdateAcademicLevelDto
  ) {
    return this.AcademicLevelService.updateAcademicLevel(
      id, updateAcademicLevelDto
    );
  }
}
