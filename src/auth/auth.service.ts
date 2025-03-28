import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto/';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { CommonService } from 'src/common/services';
import { RegionalCenter } from 'src/common/entities';
import { UpdateAuthDto } from './dto/update-auth.dto';

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

  async getAll() {
    try {
      const response = await this.userRepository.find({
        relations: { regionalCenter: true },
      });
      if (response.length === 0) {
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Usuarios no encontrados, parece que aun no hay registros',
        });
      }
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async update(id: string, userData: UpdateAuthDto) {
    const { regionalCenter, password, ...userDataToUpdate } = userData;
    try {
      const response = await this.userRepository.preload({
        id,
        ...userDataToUpdate,
        ...(password && { password: bcrypt.hashSync(password, 10) }),
      });

      if (!response)
        this.commonService.handleDBExceptions({
          code: '23503',
          detail: 'Usuario a actualizar no encontrado',
        });

      //Check if regionalCenter is gonna update
      let regionalCenterUpdated: object;
      if (regionalCenter) {
        regionalCenterUpdated = await this.commonService.getOne(
          regionalCenter,
          this.regionalCenterRrepository,
        );
      }

      const responseWithNoPassword = await this.userRepository.save({
        ...response,
        regionalCenter: regionalCenterUpdated,
      });
      delete responseWithNoPassword.password;
      return responseWithNoPassword;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
