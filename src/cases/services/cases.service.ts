import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Case } from '../entities';
import { CreateCaseDto } from '../dto/create-case.dto';
import { UpdateCaseDto } from '../dto/update-case.dto';
import { Person } from 'src/people/entities/person.entity';
import { RegionalCenter } from 'src/common/entities/regionalCenter.entity';
import { Municipality } from 'src/common/entities/municipality.entity';
import { CreateViolencetypeDto } from '../dto/create-violencetype.dto';
import { CaseViolence } from '../entities/case-violenctetype.entity';
import { ViolenceType } from 'src/common/entities/violenceType.entity';

@Injectable()
export class CasesService {

  constructor(
    @InjectRepository(Case)
    private readonly CaseRepository: Repository<Case>,

    @InjectRepository(Person)

    @InjectRepository(RegionalCenter)
    private readonly RegionalCenterRepository: Repository<RegionalCenter>,

    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,

    @InjectRepository(CaseViolence)
    private readonly CaseViolenceRepository: Repository<CaseViolence>,

    @InjectRepository(ViolenceType)
    private readonly ViolenceTypeRepository: Repository<ViolenceType>
  ) {}

  async createAcase(createCaseDto: CreateCaseDto) {
    const { regionalCenter, municipality, ...caseDetails } = createCaseDto;
    try {
      const regionalCenterById = await this.RegionalCenterRepository.findOneBy(
        { id: regionalCenter }
      );
      const municipalityById = await this.MunicipalityRepository.findOneBy(
        { id: municipality }
      );
      const caseResponse = this.CaseRepository.create({
        ...caseDetails,
        regionalCenter: regionalCenterById,
        municipality: municipalityById
      });
      await this.CaseRepository.save(caseResponse)
      return caseResponse;
    } catch (error) { console.log(error) }
  }

  async creteViolencetype(createViolencetype: CreateViolencetypeDto) {
    const { violenceType } = createViolencetype;
    try {
      const caseById = await this.CaseRepository.findOneBy({ id: createViolencetype.case })
      const violenceTypeById = await this.ViolenceTypeRepository.findOneBy({ id: violenceType }) 

      const caseViolenceResponse = this.CaseViolenceRepository.create({
        case: caseById, violenceType: violenceTypeById
      });
      return await this.CaseViolenceRepository.save(caseViolenceResponse);
    } catch (error) { console.log(error) }
  }

  findAll() {
    return `This action returns all cases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  async update(id: string, updateCaseDto: UpdateCaseDto) {

    const { regionalCenter, municipality, ...dataToUpdate } = updateCaseDto;

    try {
      const caseToUpdate = await this.CaseRepository.preload({ id, ...dataToUpdate });

      //Check if there is an foreignKey update and doing it if there is one
      let municipalityUpdated: Object;
      if(municipality) {
        municipalityUpdated = await this.MunicipalityRepository.findOneBy({ id: municipality });
      }
      let regionalCenterUpdated: Object;
      if(regionalCenter) {
        regionalCenterUpdated = await this.RegionalCenterRepository.findOneBy({ 
          id: regionalCenter
        });
      }
      console.log(regionalCenterUpdated);

      return await this.CaseRepository.save({ 
        ...caseToUpdate, 
        municipality: municipalityUpdated,
        regionalCenter: regionalCenterUpdated,
      })
    } catch(error) { console.log(error) }
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
