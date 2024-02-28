import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AcademicLevelService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CareerService,
  CommonService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IdentityTypeService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  JobPositionService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MunicipalityService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RegionalCenterService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RoleInCaseService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  VictimRelationshipService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ViolenceTypeService,
  WorkPlaceService,
} from './services';

import {
  CreateRoleInCaseDto,
  CreateVictimRelationship,
  CreateCareerDto,
  CreateWorkplaceDto,
  CreateJobPositionDto,
  CreateAcademicLevel,
  CreateRegionalCenter,
  CreateMunicipalityDto,
  CreateViolenceTypeDto,
  CreateIdentityType,
} from './dto/create/';

import {
  UpdateAcademicLevelDto,
  UpdateCareerDto,
  UpdateIdentityType,
  UpdateJobPositionDto,
  UpdateMunicipalityDto,
  UpdateRegionalCenterDto,
  UpdateRoleInCaseDto,
  UpdateVictimRelationshipDto,
  UpdateViolenceTypeDto,
  UpdateWorkplaceDto,
} from './dto/update/';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly AcademicLevelService: AcademicLevelService,
    private readonly RoleInCaseService: RoleInCaseService,
    private readonly VictimRelationshipService: VictimRelationshipService,
    private readonly CareerService: CareerService,
    private readonly WorkplaceService: WorkPlaceService,
    private readonly JobPositionService: JobPositionService,
    private readonly RegionalCenterService: RegionalCenterService,
    private readonly MunicipalityService: MunicipalityService,
    private readonly ViolenceTypeService: ViolenceTypeService,
    private readonly IdentityTypeService: IdentityTypeService,
  ) {}

  @Get()
  findAll() {
    return this.commonService.findAll();
  }

  //ACADEMIC LEVEL
  @Post('academiclevel')
  createAcademicLevel(@Body() createAcademicLevel: CreateAcademicLevel) {
    return this.AcademicLevelService.createAcademicLevel(createAcademicLevel);
  }
  @Get('academiclevel/:id')
  findOneAcademicLevel(@Param('id', ParseUUIDPipe) id: string) {
    return this.AcademicLevelService.getOne(id);
  }
  @Patch('academiclevel/:id')
  updateAcademicLevel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateAcademicLevelDto: UpdateAcademicLevelDto,
  ) {
    return this.AcademicLevelService.updateAcademicLevel(
      id,
      updateAcademicLevelDto,
    );
  }
  @Delete('academiclevel/:id')
  deleteAcademicLevel(@Param('id', ParseUUIDPipe) id: string) {
    return this.AcademicLevelService.removeAcademicLevel(id);
  }

  //ROLE IN CASE
  @Post('role-in-case')
  createRoleInCase(@Body() createRoleInCaseDto: CreateRoleInCaseDto) {
    return this.RoleInCaseService.createRoleInCase(createRoleInCaseDto);
  }
  @Get('role-in-case/:id')
  findOneRoleInCase(@Param('id', ParseUUIDPipe) id: string) {
    return this.RoleInCaseService.getOne(id);
  }
  @Patch('role-in-case/:id')
  updateRoleInCase(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateRoleInCaseDto: UpdateRoleInCaseDto,
  ) {
    return this.RoleInCaseService.updateRoleInCase(id, updateRoleInCaseDto);
  }
  @Delete('role-in-case/:id')
  deleteRoleInCase(@Param('id', ParseUUIDPipe) id: string) {
    return this.RoleInCaseService.removeRoleInCase(id);
  }

  //VICTIM RELATIONSHIP
  @Post('victim-relationship')
  cretateVictimRelationship(
    @Body() createVictimRelationship: CreateVictimRelationship,
  ) {
    return this.VictimRelationshipService.createAvictimRelationship(
      createVictimRelationship,
    );
  }
  @Get('victim-relationship/:id')
  findOneVictimRelationship(@Param('id', ParseUUIDPipe) id: string) {
    return this.VictimRelationshipService.getOne(id);
  }
  @Patch('victim-relationship/:id')
  updateVictimRelationship(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateVictimRelationshipDto: UpdateVictimRelationshipDto,
  ) {
    return this.VictimRelationshipService.updateVictimRelationship(
      id,
      updateVictimRelationshipDto,
    );
  }
  @Delete('victim-relationship/:id')
  deleteVictimRelationship(@Param('id', ParseUUIDPipe) id: string) {
    return this.VictimRelationshipService.removeVictimRelationship(id);
  }

  //CAREER
  @Post('career')
  createCareer(@Body() createCareer: CreateCareerDto) {
    return this.CareerService.createAcareer(createCareer);
  }
  @Get('career/:id')
  findOneCareer(@Param('id', ParseUUIDPipe) id: string) {
    return this.CareerService.getOne(id);
  }
  @Patch('career/:id')
  updateCareer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCareerDto: UpdateCareerDto,
  ) {
    return this.CareerService.updateCareer(id, updateCareerDto);
  }
  @Delete('career/:id')
  deleteCareer(@Param('id', ParseUUIDPipe) id: string) {
    return this.CareerService.removeCareer(id);
  }

  //WORKPLACE
  @Post('workplace')
  createWorkplace(@Body() createWorkplace: CreateWorkplaceDto) {
    return this.WorkplaceService.createWorkplace(createWorkplace);
  }
  @Get('workplace/:id')
  findOneWorkplace(@Param('id', ParseUUIDPipe) id: string) {
    return this.WorkplaceService.getOne(id);
  }
  @Patch('workplace/:id')
  updateWorkplace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWorkplaceDto: UpdateWorkplaceDto,
  ) {
    return this.WorkplaceService.updateWorkplace(id, updateWorkplaceDto);
  }
  @Delete('workplace/:id')
  deleteWorkplace(@Param('id', ParseUUIDPipe) id: string) {
    return this.WorkplaceService.removeWorkplace(id);
  }

  //JOB POSITION
  @Post('jobposition')
  createJobPosition(@Body() createJobPosition: CreateJobPositionDto) {
    return this.JobPositionService.createJobPosition(createJobPosition);
  }
  @Get('jobposition/:id')
  findOneJobposition(@Param('id', ParseUUIDPipe) id: string) {
    return this.JobPositionService.getOne(id);
  }
  @Patch('jobposition/:id')
  updateJobposition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateJobPositionDto: UpdateJobPositionDto,
  ) {
    return this.JobPositionService.updateJobPosition(id, updateJobPositionDto);
  }
  @Delete('jobposition/:id')
  deleteJobPosition(@Param('id', ParseUUIDPipe) id: string) {
    return this.JobPositionService.removeJobPosition(id);
  }

  //REGIONAL CENTER
  @Post('regionalcenter')
  createRegionalCenter(@Body() createRegionalCenter: CreateRegionalCenter) {
    return this.RegionalCenterService.createRegionalCenter(
      createRegionalCenter,
    );
  }
  @Get('regionalcenter/:id')
  findOneRegionalCenter(@Param('id', ParseUUIDPipe) id: string) {
    return this.RegionalCenterService.getOne(id);
  }
  @Patch('regionalcenter/:id')
  updateRegionalCenter(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateRegionalCenterDto: UpdateRegionalCenterDto,
  ) {
    return this.RegionalCenterService.updateRegionalCenter(
      id,
      updateRegionalCenterDto,
    );
  }
  @Delete('regionalcenter/:id')
  deleteRegionalCenter(@Param('id', ParseUUIDPipe) id: string) {
    return this.RegionalCenterService.removeRegionalCenter(id);
  }

  //MUNICIPALITY
  @Post('municipality')
  createMunicipality(@Body() createMunicipality: CreateMunicipalityDto) {
    return this.MunicipalityService.createMunicipality(createMunicipality);
  }
  @Get('municipality/:id')
  findOneMunicipality(@Param('id', ParseUUIDPipe) id: string) {
    return this.MunicipalityService.getOne(id);
  }
  @Patch('municipality/:id')
  updateMunicipality(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateMunicipalityDto: UpdateMunicipalityDto,
  ) {
    return this.MunicipalityService.updateMunicipality(
      id,
      updateMunicipalityDto,
    );
  }
  @Delete('municipality/:id')
  deleteMunicipality(@Param('id', ParseUUIDPipe) id: string) {
    return this.MunicipalityService.removeMunicipality(id);
  }

  //VIOLENCE TYPE
  @Post('violencetype')
  createViolenceType(@Body() createViolenceType: CreateViolenceTypeDto) {
    return this.ViolenceTypeService.createViolenceType(createViolenceType);
  }
  @Get('violencetype/:id')
  findOneViolenceType(@Param('id', ParseUUIDPipe) id: string) {
    return this.ViolenceTypeService.getOne(id);
  }
  @Patch('violencetype/:id')
  updateViolenceType(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateViolenceTypeDto: UpdateViolenceTypeDto,
  ) {
    return this.ViolenceTypeService.updateViolenceType(
      id,
      updateViolenceTypeDto,
    );
  }
  @Delete('violencetype/:id')
  deleteViolenceType(@Param('id', ParseUUIDPipe) id: string) {
    return this.ViolenceTypeService.removeViolenceType(id);
  }

  //IDENTITY TYPE
  @Post('identitytype')
  createIdentityType(@Body() createIdentityType: CreateIdentityType) {
    return this.IdentityTypeService.createIdentityType(createIdentityType);
  }
  @Get('identitytype/:id')
  findOneIdentityType(@Param('id', ParseUUIDPipe) id: string) {
    return this.IdentityTypeService.getOne(id);
  }
  @Patch('identitytype/:id')
  updateIdentityType(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateIdentityTypeDto: UpdateIdentityType,
  ) {
    return this.IdentityTypeService.updateIdentityType(
      id,
      updateIdentityTypeDto,
    );
  }
  @Delete('identitytype/:id')
  deleteIdentityType(@Param('id', ParseUUIDPipe) id: string) {
    return this.IdentityTypeService.removeIdentityType(id);
  }
}
