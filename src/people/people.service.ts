import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Career } from 'src/common/entities/Career.entity';
import { Workplace } from 'src/common/entities/Workplace.entity';

@Injectable()
export class PeopleService {

  constructor(
    @InjectRepository(Person)
    private readonly PersonRepository: Repository<Person>,

    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,

    @InjectRepository(Workplace)
    private readonly WorkplaceRepository: Repository<Workplace>
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const { career, workplace, ...createPersonData } = createPersonDto;
    try {
      const careerById = await this.CareerRepository.findOneBy({ id: career });
      const workplaceById = await this.WorkplaceRepository.findOneBy({ id: workplace });

      const peopleResponse = this.PersonRepository.create({
        ...createPersonData, career: careerById, workplace: workplaceById
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
