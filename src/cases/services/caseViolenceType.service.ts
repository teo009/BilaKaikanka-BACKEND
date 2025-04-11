import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateViolencetypeDto } from '../dto/caseViolencetype/create-violencetype.dto';
import { CaseViolence } from '../entities/caseViolenctetype.entity';
import { Case } from '../entities';
import { ViolenceType } from 'src/common/entities/violenceType.entity';
import { UpdateCaseViolencetypeDto } from '../dto/caseViolencetype/update-caseViolencetype.dto';
import { CommonService } from 'src/common/services';

@Injectable()
export class CaseViolenceTypeService {
  constructor(
    @InjectRepository(CaseViolence)
    private readonly CaseViolencetypeRepository: Repository<CaseViolence>,

    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>,

    @Inject(forwardRef(() => CommonService))
    readonly commonService: CommonService,

    private readonly dataSource: DataSource,
  ) {}

  async createCaseViolenceType(
    createViolencetype: CreateViolencetypeDto,
  ): Promise<CaseViolence> {
    try {
      const caseViolenceResponse = this.CaseViolencetypeRepository.create({
        case_id: createViolencetype.case,
        violenceType_id: createViolencetype.violenceType,
      });
      return await this.CaseViolencetypeRepository.save(caseViolenceResponse);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async getOne(id: string): Promise<CaseViolence> {
    return this.commonService.getOne(id, this.CaseViolencetypeRepository);
  }

  async getAllCaseViolenceType(): Promise<Array<CaseViolence>> {
    try {
      const response = await this.CaseViolencetypeRepository.find({
        relations: {
          case: true,
          violenceType: true,
        },
      });
      if (response.length === 0)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'No data found, its seems that "case - violenceType" schema is empty',
        });
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async updateCaseViolenceType(
    id: string,
    updateCaseViolencetype: UpdateCaseViolencetypeDto,
  ): Promise<CaseViolence> {
    try {
      const caseViolenceTypeUpdated =
        await this.CaseViolencetypeRepository.preload({ id });
      if (!caseViolenceTypeUpdated)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'CaseViolenceType not Found',
        });

      //Check if there is an foreignKey update and doing it if there is one
      let caseUpdated: object;
      if (updateCaseViolencetype.case) {
        caseUpdated = await this.commonService.getOne(
          updateCaseViolencetype.case,
          this.CaseRepository,
        );
      }
      let violenceTypeUpdated: object;
      if (updateCaseViolencetype.violenceType) {
        violenceTypeUpdated = await this.commonService.getOne(
          updateCaseViolencetype.violenceType,
          this.ViolenceTypeRepository,
        );
      }
      return await this.CaseViolencetypeRepository.save({
        ...caseViolenceTypeUpdated,
        case: caseUpdated,
        violenceType: violenceTypeUpdated,
      });
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async removeCaseViolenceType(id: string): Promise<void | string> {
    try {
      const response = await this.dataSource
        .getRepository(CaseViolence)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return response.affected === 0
        ? this.commonService.handleDBExceptions({
            code: '23503',
            detail: 'No "Case - ViolenceType" found to remove',
          })
        : `The "Case - ViolenceType" id: ${id} has been succesfully removed`;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
