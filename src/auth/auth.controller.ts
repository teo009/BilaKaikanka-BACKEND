import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto, LoginUserDto } from './dto/';
import { Auth, GetUser } from './decorators/';
import { User } from './entities/user.entity';
import { ValidRoles } from '../common/enums/valid-roles.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  logIn(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }

  @Get('users')
  getAllUsers() {
    return this.authService.getAll();
  }

  @Get('private')
  @Auth(ValidRoles.director)
  testingPrivateRoutes(@GetUser() user: User) {
    return `Bienvenido ${user.fullName}`;
  }
}
