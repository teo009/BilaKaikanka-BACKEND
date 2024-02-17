import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateViolencetypeDto } from "../dto/create-violencetype.dto";
import { CaseViolence } from "../entities/case-violenctetype.entity";
import { Case } from "../entities";
import { ViolenceType } from "src/common/entities/violenceType.entity";


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

}