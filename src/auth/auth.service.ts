import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto/';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { CommonService } from 'src/common/services';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, regionalCenter, ...userData } = createUserDto;
      const userToSave = this.userRepository.create({
        ...userData,
        regionalCenterId: regionalCenter,
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
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, role: true },
    });

    if (!user)
      throw new UnauthorizedException(`Credenciales inválidas para ${email}`);
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        `Credenciales inválidas para (contraseña)`,
      );

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
