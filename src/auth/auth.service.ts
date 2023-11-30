import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { CreateUserDto } from './dto/';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const response = await this.userRepository.save(createUserDto);
      return response;
    } catch(error) {
      this.handleDBerrors(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  //Own methods
  private handleDBerrors(error: any) {
    if(error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Error 500, please check server logs');
  }

}
