import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CommonService } from './common.service';
import { UpdateCommonDto } from './dto/update-common.dto';
import { CreateRoleInCaseDto } from './dto/create-roleInCase.dto';
import { CreateVictimRelationship } from './dto/create-victimRelationship';
import { CreateCareerDto } from './dto/create-career.dto';

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
