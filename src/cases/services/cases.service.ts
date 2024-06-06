import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Case } from '../entities';
import { CreateCaseDto, UpdateCaseDto } from '../dto/';
import { RegionalCenter, Municipality } from 'src/common/entities';
import { CommonService } from 'src/common/services';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,
    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,
    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,

    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async createAcase(createCaseDto: CreateCaseDto): Promise<Case> {
    const { regionalCenter, municipality, ...caseDetails } = createCaseDto;
    try {
      const caseResponse = this.CaseRepository.create({
        ...caseDetails,
        regionalCenter_id: regionalCenter,
        municipality_id: municipality,
      });
      await this.CaseRepository.save(caseResponse);
      return caseResponse;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getAllCases(): Promise<Array<Case>> {
    try {
      const response = await this.dataSource
        .getRepository(Case)
        .createQueryBuilder('case')
        .leftJoin('case.regionalCenter', 'regionalCenter')
        .leftJoin('case.municipality', 'municipality')
        .leftJoin('case.caseViolence', 'caseViolence')
        .leftJoin('caseViolence.violenceType', 'violenceType')
        .select(['case', 'regionalCenter', 'municipality', 'violenceType'])
        .getRawMany();
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Data not found, its seems that cases schema is empty',
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
    const { regionalCenter, municipality, ...dataToUpdate } = updateCaseDto;
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
        .leftJoin('case.casePerson', 'casePerson')
        .leftJoin('casePerson.person', 'person')
        .select([
          'case',
          'municipality',
          'violenceType',
          'casePerson',
          'person',
        ])
        .where('case.id = :id', { id })
        .getOne();
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
