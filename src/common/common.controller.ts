import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AcademicLevelService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CareerService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DocumentService,
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
import { documentNamer, postDocumentFiler } from './helpers/';

@Controller('common')
export class CommonController {
  constructor(
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
    private readonly DocumentService: DocumentService,
  ) {}

  //Files
  @Post('upload-document')
  @UseInterceptors(
    FileInterceptor('document', {
      fileFilter: postDocumentFiler,
      storage: diskStorage({
        destination: './static/politics',
        filename: documentNamer,
      }),
    }),
  )
  uploadDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5000000 })],
      }),
    )
    document: Express.Multer.File,
  ) {
    if (!document)
      throw new BadRequestException(
        'Formato de documento incorrecto, se necesita el tipo pdf',
      );
    return this.DocumentService.createDocument(
      document.originalname.split('.')[0],
    );
  }
  @Get('get-document/:documentName')
  getOneDocument(
    @Res() response: Response,
    @Param('documentName') documentName: string,
  ) {
    const path = this.DocumentService.getStaticDocument(documentName);
    console.log('Pidiendo documento :' + documentName);
    response.sendFile(path);
  }
  @Get('get-all-documents')
  getAllTheDocuments() {
    return this.DocumentService.getAllTheDocuments();
  }

  //ACADEMIC LEVEL
  @Post('academicLevel')
  createAcademicLevel(@Body() createAcademicLevel: CreateAcademicLevel) {
    return this.AcademicLevelService.createAcademicLevel(createAcademicLevel);
  }
  @Get('academicLevel')
  findAll() {
    return this.AcademicLevelService.getAll();
  }
  @Get('academicLevel/:id')
  findOneAcademicLevel(@Param('id', ParseUUIDPipe) id: string) {
    return this.AcademicLevelService.getOne(id);
  }
  @Patch('academicLevel/:id')
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
  @Delete('academicLevel/:id')
  deleteAcademicLevel(@Param('id', ParseUUIDPipe) id: string) {
    return this.AcademicLevelService.removeAcademicLevel(id);
  }

  //ROLE IN CASE
  @Post('roleInCase')
  createRoleInCase(@Body() createRoleInCaseDto: CreateRoleInCaseDto) {
    return this.RoleInCaseService.createRoleInCase(createRoleInCaseDto);
  }
  @Get('roleInCase')
  findAllRoleInCases() {
    return this.RoleInCaseService.getAll();
  }
  @Get('roleInCase/:id')
  findOneRoleInCase(@Param('id', ParseUUIDPipe) id: string) {
    return this.RoleInCaseService.getOne(id);
  }
  @Patch('roleInCase/:id')
  updateRoleInCase(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateRoleInCaseDto: UpdateRoleInCaseDto,
  ) {
    return this.RoleInCaseService.updateRoleInCase(id, updateRoleInCaseDto);
  }
  @Delete('roleInCase/:id')
  deleteRoleInCase(@Param('id', ParseUUIDPipe) id: string) {
    return this.RoleInCaseService.removeRoleInCase(id);
  }

  //VICTIM RELATIONSHIP
  @Post('victimRelationship')
  cretateVictimRelationship(
    @Body() createVictimRelationship: CreateVictimRelationship,
  ) {
    return this.VictimRelationshipService.createAvictimRelationship(
      createVictimRelationship,
    );
  }
  @Get('victimRelationship')
  findAllVictimRelationship() {
    return this.VictimRelationshipService.getAll();
  }
  @Get('victimRelationship/:id')
  findOneVictimRelationship(@Param('id', ParseUUIDPipe) id: string) {
    return this.VictimRelationshipService.getOne(id);
  }
  @Patch('victimRelationship/:id')
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
  @Delete('victimRelationship/:id')
  deleteVictimRelationship(@Param('id', ParseUUIDPipe) id: string) {
    return this.VictimRelationshipService.removeVictimRelationship(id);
  }

  //CAREER
  @Post('career')
  createCareer(@Body() createCareer: CreateCareerDto) {
    return this.CareerService.createAcareer(createCareer);
  }
  @Get('career')
  findAllCareers() {
    return this.CareerService.getAll();
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
  @Get('workplace')
  findAllWorkPlaces() {
    return this.WorkplaceService.getAll();
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
  @Post('jobPosition')
  createJobPosition(@Body() createJobPosition: CreateJobPositionDto) {
    return this.JobPositionService.createJobPosition(createJobPosition);
  }
  @Get('jobPosition')
  findAllJobPositions() {
    return this.JobPositionService.getAll();
  }
  @Get('jobPosition/:id')
  findOneJobposition(@Param('id', ParseUUIDPipe) id: string) {
    return this.JobPositionService.getOne(id);
  }
  @Patch('jobPosition/:id')
  updateJobposition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateJobPositionDto: UpdateJobPositionDto,
  ) {
    return this.JobPositionService.updateJobPosition(id, updateJobPositionDto);
  }
  @Delete('jobPosition/:id')
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
  @Get('regionalcenter')
  findAllRegionalcenter() {
    return this.RegionalCenterService.getAll();
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
  @Get('municipality')
  findAllMunicipalities() {
    return this.MunicipalityService.getAll();
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
  @Get('violencetype')
  findAllViolenceTypes() {
    return this.ViolenceTypeService.getAll();
  }
  @Get('violencetype/:id')
  findOneViolenceType(@Param('id', ParseUUIDPipe) id: string) {
    return this.ViolenceTypeService.getOne(id);
  }
  @Patch('violencetype/:id')
  updateViolenceType(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateViolenceType: UpdateViolenceTypeDto,
  ) {
    return this.ViolenceTypeService.updateViolenceType(id, updateViolenceType);
  }
  @Delete('violencetype/:id')
  deleteViolenceType(@Param('id', ParseUUIDPipe) id: string) {
    return this.ViolenceTypeService.removeViolenceType(id);
  }

  //IDENTITY TYPE
  @Post('identityType')
  createIdentityType(@Body() createIdentityType: CreateIdentityType) {
    return this.IdentityTypeService.createIdentityType(createIdentityType);
  }
  @Get('identityType')
  findAllIdentityTypes() {
    return this.IdentityTypeService.getAll();
  }
  @Get('identityType/:id')
  findOneIdentityType(@Param('id', ParseUUIDPipe) id: string) {
    return this.IdentityTypeService.getOne(id);
  }
  @Patch('identityType/:id')
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
  @Delete('identityType/:id')
  deleteIdentityType(@Param('id', ParseUUIDPipe) id: string) {
    return this.IdentityTypeService.removeIdentityType(id);
  }
}
