import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidRoles } from 'src/common/enums/';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @MinLength(3)
  fullName: string;

  @IsString()
  @Matches(/^(admin|director|coordinator|digitizer|psychologist)$/, {
    message: `El rol debe contener: (admin|director|coordinator|digitizer|psychologist)`,
  })
  role: ValidRoles;

  @IsOptional()
  @IsUUID()
  regionalCenter: string;
}
