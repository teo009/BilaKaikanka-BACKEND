import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateViolencetypeDto } from '../dto/caseViolencetype/create-violencetype.dto';
import { CaseViolence } from '../entities/case-violenctetype.entity';
import { Case } from '../entities';
import { ViolenceType } from 'src/common/entities/violenceType.entity';
import { UpdateCaseViolencetypeDto } from '../dto/caseViolencetype/update-caseViolencetype.dto';

@Injectable()
export class CaseViolenceTypeService {
  constructor(
    @InjectRepository(CaseViolence)
    private readonly CaseViolencetypeRepository: Repository<CaseViolence>,

    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>,

    private readonly dataSource: DataSource,
  ) {}

  async createCaseViolenceType(createViolencetype: CreateViolencetypeDto) {
    const { violenceType } = createViolencetype;
    try {
      const caseById = await this.CaseRepository.findOneBy({
        id: createViolencetype.case,
      });
      const violenceTypeById = await this.ViolenceTypeRepository.findOneBy({
        id: violenceType,
      });

      const caseViolenceResponse = this.CaseViolencetypeRepository.create({
        case: caseById,
        violenceType: violenceTypeById,
      });
      return await this.CaseViolencetypeRepository.save(caseViolenceResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: string, repository?: any): Promise<any> {
    let singleCaseViolenceTye: any;
    if (!repository) {
      singleCaseViolenceTye = await this.CaseViolencetypeRepository.findOneBy({
        id,
      });
    } else {
      singleCaseViolenceTye = await repository.findOneBy({
        id,
      });
    }
    if (!singleCaseViolenceTye)
      throw new NotFoundException('Register was not found');
    return singleCaseViolenceTye;
  }

  async updateCaseViolenceType(
    id: string,
    updateCaseViolencetype: UpdateCaseViolencetypeDto,
  ) {
    try {
      const caseViolenceTypeUpdated =
        await this.CaseViolencetypeRepository.preload({ id });

      //Check if there is an foreignKey update and doing it if there is one
      let caseUpdated: object;
      if (updateCaseViolencetype.case) {
        caseUpdated = await this.CaseRepository.findOneBy({
          id: updateCaseViolencetype.case,
        });
      }
      let violenceTypeUpdated: object;
      if (updateCaseViolencetype.violenceType) {
        violenceTypeUpdated = await this.ViolenceTypeRepository.findOneBy({
          id: updateCaseViolencetype.violenceType,
        });
      }
      return await this.CaseViolencetypeRepository.save({
        ...caseViolenceTypeUpdated,
        case: caseUpdated,
        violenceType: violenceTypeUpdated,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async removeCaseViolenceType(id: string) {
    try {
      await this.dataSource
        .getRepository(CaseViolence)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `El caso - tipo de violencia id: ${id} ha sido eliminado exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}
