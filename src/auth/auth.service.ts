import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto/';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { CommonService } from 'src/common/services';
import { RegionalCenter } from 'src/common/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RegionalCenter)
    private readonly regionalCenterRrepository: Repository<RegionalCenter>,
    private readonly jwtService: JwtService,
    private readonly commonService: CommonService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, regionalCenter, ...userData } = createUserDto;

      let regionalCenterToSave;
      if (regionalCenter)
        regionalCenterToSave = await this.commonService.getOne(
          regionalCenter,
          this.regionalCenterRrepository,
        );

      const userToSave = this.userRepository.create({
        ...userData,
        regionalCenter: regionalCenterToSave,
        password: bcrypt.hashSync(password, 10),
      });

      const response = await this.userRepository.save(userToSave);
      delete response.password;
      return {
        ...response,
        token: this.getJwtToken({ id: response.id }),
      };
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async login(LoginUserDto: LoginUserDto) {
    const { password, email } = LoginUserDto;

    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.regionalCenter', 'regionalCenter')
      .select([
        'user',
        'user.password',
        'regionalCenter.id',
        'regionalCenter.name',
      ])
      .where('user.email = :email', { email })
      .getOne();

    if (!user)
      throw new UnauthorizedException(`Correo inexistente o incorrecto`);
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Contraseña incorrecta`);

    delete user.id;
    delete user.password;

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  //Own methods
  private handleDBerrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(
      'Error 500, please check server logs',
    );
  }
  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
