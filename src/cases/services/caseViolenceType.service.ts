import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateViolencetypeDto } from "../dto/create-violencetype.dto";
import { CaseViolence } from "../entities/case-violenctetype.entity";
import { Case } from "../entities";
import { ViolenceType } from "src/common/entities/violenceType.entity";
import { UpdateCaseViolencetypeDto } from '../dto/caseViolencetype/update-caseViolencetype.dto';


@Injectable()
export class CaseViolenceTypeService {

  constructor(
    @InjectRepository(CaseViolence)
    private readonly CaseViolencetypeRepository: Repository<CaseViolence>,

    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>
  ){}

  async createCaseViolenceType(createViolencetype: CreateViolencetypeDto) {
    const { violenceType } = createViolencetype;
    try {
      const caseById = await this.CaseRepository.findOneBy({ id: createViolencetype.case })
      const violenceTypeById = await this.ViolenceTypeRepository.findOneBy({ id: violenceType }) 

      const caseViolenceResponse = this.CaseViolencetypeRepository.create({
        case: caseById, violenceType: violenceTypeById
      });
      return await this.CaseViolencetypeRepository.save(caseViolenceResponse);
    } catch (error) { console.log(error) }
  }

  async updateCaseViolenceType(id: string, updateCaseViolencetype: UpdateCaseViolencetypeDto) {

    try {
      const caseViolenceTypeUpdated = await this.CaseViolencetypeRepository.preload({ id });

      //Check if there is an foreignKey update and doing it if there is one
      let caseUpdated: Object;
      if(updateCaseViolencetype.case) {
        caseUpdated = await this.CaseRepository.findOneBy({ id: updateCaseViolencetype.case });
      }
      let violenceTypeUpdated: Object;
      if(updateCaseViolencetype.violenceType) {
        violenceTypeUpdated = await this.ViolenceTypeRepository.findOneBy({ 
          id: updateCaseViolencetype.violenceType 
        });
      }

      return await this.CaseViolencetypeRepository.save({
        ...caseViolenceTypeUpdated,
        case: caseUpdated,
        violenceType: violenceTypeUpdated
      })
    } catch(error) { console.log(error); }
  }

}