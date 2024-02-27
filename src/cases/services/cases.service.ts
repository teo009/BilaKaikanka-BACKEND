import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Case } from '../entities';
import { CreateCaseDto, UpdateCaseDto } from '../dto/';
import { RegionalCenter, Municipality } from 'src/common/entities';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,

    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,

    private readonly dataSource: DataSource,
  ) {}

  async createAcase(createCaseDto: CreateCaseDto) {
    const { regionalCenter, municipality, ...caseDetails } = createCaseDto;
    try {
      const regionalCenterById = await this.getOne(
        regionalCenter,
        this.RegionalCenterRepository,
      );
      const municipalityById = await this.getOne(
        municipality,
        this.MunicipalityRepository,
      );
      const caseResponse = this.CaseRepository.create({
        ...caseDetails,
        regionalCenter: regionalCenterById,
        municipality: municipalityById,
      });
      await this.CaseRepository.save(caseResponse);
      return caseResponse;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all cases`;
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let singleCase: any;
    if (!repository) {
      singleCase = await this.CaseRepository.findOneBy({
        id,
      });
    } else {
      singleCase = await repository.findOneBy({
        id,
      });
    }
    if (!singleCase) throw new NotFoundException('Register was not found');
    return singleCase;
  }

  async update(id: string, updateCaseDto: UpdateCaseDto) {
    const { regionalCenter, municipality, ...dataToUpdate } = updateCaseDto;

    try {
      const caseToUpdate = await this.CaseRepository.preload({
        id,
        ...dataToUpdate,
      });

      //Check if there is an foreignKey update and doing it if there is one
      let municipalityUpdated: object;
      if (municipality) {
        municipalityUpdated = await this.getOne(
          municipality,
          this.MunicipalityRepository,
        );
      }
      let regionalCenterUpdated: object;
      if (regionalCenter) {
        regionalCenterUpdated = await this.getOne(
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
      console.log(error);
    }
  }

  async removeCase(id: string) {
    try {
      await this.dataSource
        .getRepository(Case)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El caso id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
