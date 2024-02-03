import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Career } from 'src/common/entities/Career.entity';

@Injectable()
export class PeopleService {

  constructor(
    @InjectRepository(Person)
    private readonly PersonRepository: Repository<Person>,

    @InjectRepository(Career)
    private readonly CareerRepository: Repository<Career>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const { career, ...createPersonData } = createPersonDto;
    try {
      const careerById = await this.CareerRepository.findOneBy({ id: career })
      const peopleResponse = this.PersonRepository.create({
        ...createPersonData, career: careerById
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
