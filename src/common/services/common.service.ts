import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {

  constructor(  ) {  }

  findAll() {
    return `This action returns all common`;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }
}
