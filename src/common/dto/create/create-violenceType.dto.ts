import { IsString } from 'class-validator';

export class CreateViolenceTypeDto {
  @IsString()
  name: string;
}
