import { IsString } from "class-validator";


export class CreateRegionalCenter {

  @IsString()
  regionalCenter: string;

}