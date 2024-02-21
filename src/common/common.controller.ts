import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { 
  AcademicLevelService, 
  CareerService, 
  CommonService, 
  IdentityTypeService, 
  JobPositionService, 
  MunicipalityService, 
  RegionalCenterService, 
  RoleInCaseService, 
  VictimRelationshipService, 
  ViolenceTypeService, 
  WorkPlaceService
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
  CreateIdentityType
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
  UpdateWorkplaceDto
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
    private readonly IdentityTypeService: IdentityTypeService
  ) {}

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
  updateAcademicLevel(
    @Param('id', ParseUUIDPipe) id: string, @Body() 
    updateAcademicLevelDto: UpdateAcademicLevelDto
  ) {
    return this.AcademicLevelService.updateAcademicLevel(
      id, updateAcademicLevelDto
    );
  }

  //ROLE IN CASE
  @Post('role-in-case')
  create(@Body() createRoleInCaseDto: CreateRoleInCaseDto) {
    return this.RoleInCaseService.createRoleInCase(createRoleInCaseDto);
  }

  @Patch('role-in-case/:id')
  updateRoleInCase(
    @Param('id', ParseUUIDPipe) id: string, @Body()
    updateRoleInCaseDto: UpdateRoleInCaseDto
  ) {
    return this.RoleInCaseService.updateRoleInCase(
      id, updateRoleInCaseDto
    );
  }

  //VICTIM RELATIONSHIP
  @Post('victim-relationship')
  cretateVictimRelationship(
    @Body() createVictimRelationship: CreateVictimRelationship
  ) {
    return this.VictimRelationshipService.createAvictimRelationship(
      createVictimRelationship
    ); 
  }

  @Patch('victim-relationship/:id')
  updateVictimRelationship(
    @Param('id', ParseUUIDPipe) id: string, @Body()
    updateVictimRelationshipDto: UpdateVictimRelationshipDto
  ) {
    return this.VictimRelationshipService.updateVictimRelationship(
      id, updateVictimRelationshipDto
    );
  }

  //CAREER
  @Post('career')
  createCareer(@Body() createCareer: CreateCareerDto) {
    return this.CareerService.createAcareer(createCareer)
  }

  @Patch('career/:id')
  updateCareer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCareerDto: UpdateCareerDto
  ) {
    return this.CareerService.updateCareer(id, updateCareerDto);
  }

  //WORKPLACE
  @Post('workplace')
  createWorkplace(@Body() createWorkplace: CreateWorkplaceDto) {
    return this.WorkplaceService.createWorkplace(createWorkplace);
  }

  @Patch('workplace/:id')
  updateWorkplace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWorkplaceDto: UpdateWorkplaceDto
  ) {
    return this.WorkplaceService.updateWorkplace(id, updateWorkplaceDto);
  }

  //JOB POSITION
  @Post('jobposition')
  createJobPosition(@Body() createJobPosition: CreateJobPositionDto) {
    return this.JobPositionService.createJobPosition(createJobPosition);
  }

  @Patch('jobposition/:id')
  updateJobposition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateJobPositionDto: UpdateJobPositionDto
  ) {
    return this.JobPositionService.updateJobPosition(
      id, updateJobPositionDto
    );
  }

  //REGIONAL CENTER
  @Post('regionalcenter')
  createRegionalCenter(@Body() createRegionalCenter: CreateRegionalCenter) {
    return this.RegionalCenterService.createRegionalCenter(createRegionalCenter);
  }

  @Patch('regionalcenter/:id')
  updateRegionalCenter(
    @Param('id', ParseUUIDPipe) id: string, @Body() 
    updateRegionalCenterDto: UpdateRegionalCenterDto
  ) {
    return this.RegionalCenterService.updateRegionalCenter(
      id, updateRegionalCenterDto
    );
  }

  //MUNICIPALITY
  @Post('municipality') 
  createMunicipality(@Body() createMunicipality: CreateMunicipalityDto) {
    return this.MunicipalityService.createMunicipality(createMunicipality);
  }

  @Patch('municipality/:id')
  updateMunicipality(
    @Param('id', ParseUUIDPipe) id: string, @Body()
    updateMunicipalityDto: UpdateMunicipalityDto
  ) {
    return this.MunicipalityService.updateMunicipality(
      id, updateMunicipalityDto
    );
  }

  //VIOLENCE TYPE
  @Post('violencetype')
  createViolenceType(@Body() createViolenceType: CreateViolenceTypeDto) {
    return this.ViolenceTypeService.createViolenceType(createViolenceType);
  }

  @Patch('violencetype/:id')
  updateViolenceType(
    @Param('id', ParseUUIDPipe) id: string, @Body()
    updateViolenceTypeDto: UpdateViolenceTypeDto
  ) {
    return this.ViolenceTypeService.updateViolenceType(
      id, updateViolenceTypeDto
    );
  }

  //IDENTITY TYPE
  @Post('identitytype')
  createIdentityType(@Body() createIdentityType: CreateIdentityType) {
    return this.IdentityTypeService.createIdentityType(createIdentityType);
  }

  @Patch('identitytype/:id')
  updateIdentityType(
    @Param('id', ParseUUIDPipe) id: string, @Body()
    updateIdentityTypeDto: UpdateIdentityType
  ) {
    return this.IdentityTypeService.updateIdentityType(
      id, updateIdentityTypeDto
    );
  }

}
