import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const userToSave = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      const response = await this.userRepository.save(userToSave);
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
