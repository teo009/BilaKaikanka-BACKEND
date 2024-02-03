import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateCommonDto } from './dto/update-common.dto';
import { CreateRoleInCaseDto } from './dto/create-roleInCase.dto';
import { RoleInCase } from './entities/roleInCase.entity';
import { CreateVictimRelationship } from './dto/create-victimRelationship';
import { VictimRealationship } from './entities/VictimRelationship.entity';
import { Career } from './entities/Career.entity';
import { CreateCareerDto } from './dto/create-career.dto';
import { Workplace } from './entities/Workplace.entity';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { CreateJobPositionDto } from './dto/create-jobPosition.dto';
import { JobPosition } from './entities/jobPosition.entity';
import { CreateAcademicLevel } from './dto/create-AcademicLevel.dto';
import { AcademicLevel } from './entities/AcademicLevel.entity';
import { CreateRegionalCenter } from './dto/create-regionalCenter.dto';
import { RegionalCenter } from './entities/regionalCenter.entity';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { Municipality } from './entities/municipality.entity';
import { CreateViolenceTypeDto } from './dto/create-violenceType.dto';
import { ViolenceType } from './entities/violenceType.entity';

@Injectable()
export class CommonService {

  constructor(
    @InjectRepository(RoleInCase)
    private readonly RoleInCaseRepository: Repository<RoleInCase>,

    @InjectRepository(VictimRealationship)
    private readonly VictimRelationshipRepository: Repository<VictimRealationship>,

    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,

    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,

    @InjectRepository(JobPosition)
    private readonly JobPositionRepository: Repository<JobPosition>,

    @InjectRepository(AcademicLevel)
    private readonly AcademicLevelRepository: Repository<AcademicLevel>,

    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,

    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,

    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>,
  ) {}

  async createArole(createRoleInCaseDto: CreateRoleInCaseDto) {
    try {
      const roleResponse = this.RoleInCaseRepository.create(createRoleInCaseDto);
      return await this.RoleInCaseRepository.save(roleResponse);
    } catch (error) { console.log(error); }
    return 'This action adds a new common';
  }

  async createAvictimRelationship(createVictimRelationship: CreateVictimRelationship) {
    try { 
      const victimRelationshipResponse = this.VictimRelationshipRepository.create(
        createVictimRelationship
      );
      return await this.VictimRelationshipRepository.save(
        victimRelationshipResponse
      );
    } catch (error) { console.log(error) }
  }

  async createAcareer(createCareer: CreateCareerDto) {
    try {
      const careerResponse = this.CareerRepository.create(createCareer);
      return await this.CareerRepository.save(careerResponse);
    } catch (error) { console.log(error) }
  }

  async createWorkplace(createWorkplace: CreateWorkplaceDto) {
    try {
      const workplaceResponse = this.WorkplaceRepository.create(createWorkplace);
      return await this.WorkplaceRepository.save(workplaceResponse);
    } catch (error) { console.log(error) }
  }

  async createJobPosition(createJobPosition: CreateJobPositionDto) {
    try {
      const jobPositionResponse = this.JobPositionRepository.create(createJobPosition);
      return await this.JobPositionRepository.save(jobPositionResponse);
    } catch (error) { console.log(error) }
  }

  async createAcademicLevel(createAcademicLevel: CreateAcademicLevel) {
    try {
      const academicLevelResponse = this.AcademicLevelRepository.create(createAcademicLevel);
      return await this.AcademicLevelRepository.save(academicLevelResponse);
    } catch (error) { console.log(error) }
  }

  async createRegionalCenter(createRegionalCenter: CreateRegionalCenter) {
    try {
      const regionalCenterResponse = this.RegionalCenterRepository.create(createRegionalCenter);
      return await this.RegionalCenterRepository.save(regionalCenterResponse);
    } catch (error) { console.log(error) }
  } 

  async createMunicipality(createMunicipality: CreateMunicipalityDto) {
    try {
      const municipalityResponse = this.MunicipalityRepository.create(createMunicipality);
      return await this.MunicipalityRepository.save(municipalityResponse);
    } catch (error) { console.log(error) }
  }

  async createViolenceType(createViolenceType: CreateViolenceTypeDto) {
    try {
      const violenceTypeResponse = this.ViolenceTypeRepository.create(createViolenceType);
      return await this.ViolenceTypeRepository.save(violenceTypeResponse);
    } catch (error) { console.log(error) }
  }

  findAll() {
    return `This action returns all common`;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  update(id: number, updateCommonDto: UpdateCommonDto) {
    return `This action updates a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }
}
