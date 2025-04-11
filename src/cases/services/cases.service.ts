import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Case, CasePerson } from '../entities';
import { CreateCaseDto, UpdateCaseDto } from '../dto/';
import {
  RegionalCenter,
  Municipality,
  TrackingStatus,
  PsychologicalReport,
} from 'src/common/entities';
import { CommonService, TrackingStatusService } from 'src/common/services';
import { CasePivotService } from './casePivot.service';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,
    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,
    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,
    @InjectRepository(PsychologicalReport)
    private readonly PsychoReportRepository: Repository<PsychologicalReport>,

    private readonly trackingStatusService: TrackingStatusService,
    private readonly caseTrackingservice: CasePivotService,
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createAcase(createCaseDto: CreateCaseDto): Promise<Case> {
    const { regionalCenter, municipality, psychologicalReport, ...caseDetails } = createCaseDto;
    try {
      const caseResponse = this.CaseRepository.create({
        ...caseDetails,
        need_psychologist: false,
        regionalCenter_id: regionalCenter,
        municipality_id: municipality,
        //psychologicalReport: psychologicalReport,
      });
      await this.CaseRepository.save(caseResponse);
      await this.getDeffaultTrackingStatus(caseResponse.id);
      return caseResponse;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAllCases(regionalCenterId: string): Promise<Array<Case>> {
    try {
      const response = await this.dataSource
        .getRepository(Case)
        .createQueryBuilder('case')
        .leftJoin('case.regionalCenter', 'regionalCenter')
        .leftJoin('case.municipality', 'municipality')
        .leftJoin('case.caseViolence', 'caseViolence')
        .leftJoin('case.caseTracking', 'caseTracking')
        .leftJoin('caseTracking.trackingStatus', 'trackingStatus')
        .leftJoin('caseViolence.violenceType', 'violenceType')
        .select([
          'case',
          'regionalCenter',
          'municipality',
          'violenceType',
          'trackingStatus',
        ])
        .where('regionalCenter.id = :regionalCenterId', { regionalCenterId })
        .getRawMany();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'No se encontraron casos registrados aún',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<Case> {
    return this.commonService.getOne(id, this.CaseRepository);
  }

  async update(id: string, updateCaseDto: UpdateCaseDto): Promise<Case> {
    const { regionalCenter, municipality, psychologicalReport, ...dataToUpdate } = updateCaseDto;
    try {
      const caseToUpdate = await this.CaseRepository.preload({
        id,
        ...dataToUpdate,
      });
      if (!caseToUpdate)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: '"Case" to update not found',
        });

      //Check if there is an foreignKey update and doing it if there is one
      let psychologicalReportUpdated: object;
      if (psychologicalReport) {
        psychologicalReportUpdated = await this.commonService.getOne(
          psychologicalReport,
          this.PsychoReportRepository,
        )
      }
      let municipalityUpdated: object;
      if (municipality) {
        municipalityUpdated = await this.commonService.getOne(
          municipality,
          this.MunicipalityRepository,
        );
      }
      let regionalCenterUpdated: object;
      if (regionalCenter) {
        regionalCenterUpdated = await this.commonService.getOne(
          regionalCenter,
          this.RegionalCenterRepository,
        );
      }
      return await this.CaseRepository.save({
        ...caseToUpdate,
        municipality: municipalityUpdated,
        regionalCenter: regionalCenterUpdated,
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeCase(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(Case)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: 'No case found to remove',
          })
        : `The case: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOneWithDetails(id: string): Promise<any> {
    try {
      const response = await this.dataSource
        .getRepository(Case)
        .createQueryBuilder('case')
        .leftJoin('case.regionalCenter', 'regionalCenter')
        .leftJoin('case.municipality', 'municipality')
        .leftJoin('case.caseViolence', 'caseViolence')
        .leftJoin('caseViolence.violenceType', 'violenceType')
        .leftJoin('case.caseTracking', 'caseTracking')
        .leftJoin('caseTracking.trackingStatus', 'trackingStatus')
        .leftJoin('case.casePerson', 'casePerson')
        .leftJoin('casePerson.person', 'person')
        .leftJoin('casePerson.roleInCase', 'roleInCase')
        .leftJoin('casePerson.victimRelationship', 'victimRelationship')
        .select([
          'case',
          'regionalCenter',
          'municipality',
          'caseViolence',
          'caseTracking',
          'trackingStatus.name',
          'violenceType',
          'casePerson',
          'person',
          'roleInCase',
          'victimRelationship',
        ])
        .where('case.id = :id', { id })
        .getOne();
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getDeffaultTrackingStatus(caseId: string) {
    try {
      //Getting redy trackingStatus deffault ID
      let deffaultTrackingStatusId: string;
      const trackingStatusResponse = await this.trackingStatusService.findAll();
      trackingStatusResponse.map((singleTs: TrackingStatus) => {
        if (singleTs.name === 'pending') deffaultTrackingStatusId = singleTs.id;
      });
      //Creating the deffault caseTracking register
      await this.caseTrackingservice.createCaseTracking({
        caseId: caseId,
        trackingStatusId: deffaultTrackingStatusId,
        description: 'Caso pendiente de revisión',
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async checkRolesInOnecase(caseId: string): Promise<boolean> {
    const validRoleaToSaveTheCase: Array<string> = ['Victima', 'Denunciante'];
    const checkedRoles: Array<boolean> = [];

    try {
      const response = await this.dataSource
        .getRepository(CasePerson)
        .createQueryBuilder('casePerson')
        .leftJoin('casePerson.case', 'case')
        .leftJoin('casePerson.roleInCase', 'roleInCase')
        .select(['casePerson.id', 'roleInCase.name'])
        .where('case.id = :id', { id: caseId })
        .getMany();

      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: 23503,
          detail: 'No se encontraron datos para evaluar los roles en el caso',
        });

      const rolesStored = response.map((singleCP) => {
        return singleCP.roleInCase.name;
      });

      for (let i: number = 0; i < validRoleaToSaveTheCase.length; i++) {
        if (rolesStored.includes(validRoleaToSaveTheCase[i])) {
          checkedRoles.push(true);
        } else {
          checkedRoles.push(false);
        }
      }

      return checkedRoles.includes(false) ? false : true;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
