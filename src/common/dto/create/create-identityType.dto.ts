import { IsString } from 'class-validator';

export class CreateIdentityType {
  @IsString()
  name: string;
}
