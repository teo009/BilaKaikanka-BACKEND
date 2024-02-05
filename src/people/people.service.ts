import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Career } from 'src/common/entities/Career.entity';
import { Workplace } from 'src/common/entities/Workplace.entity';
import { Municipality } from 'src/common/entities/municipality.entity';

@Injectable()
export class PeopleService {

  constructor(
    @InjectRepository(Person)
    private readonly PersonRepository: Repository<Person>,

    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,

    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>,

    @InjectRepository(Municipality)
    private readonly MunicipalityRepository: Repository<Municipality>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const { career, workplace, municipality, ...createPersonData } = createPersonDto;
    try {
      const careerById = await this.CareerRepository.findOneBy({ id: career });
      const workplaceById = await this.WorkplaceRepository.findOneBy({ id: workplace });
      const municipalityById = await this.MunicipalityRepository.findOneBy({ id: municipality })

      const peopleResponse = this.PersonRepository.create({
        ...createPersonData, 
        career: careerById, 
        workplace: workplaceById,
        municipality: municipalityById,
      });
      await this.PersonRepository.save(peopleResponse);
      return peopleResponse;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all people`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
