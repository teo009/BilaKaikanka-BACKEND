import { IsString } from "class-validator";


export class CreateRoleInCaseDto {

  @IsString()
  roleName: string;

}
