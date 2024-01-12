import { IsString } from "class-validator";


export class CreateVictimRelationship {

  @IsString()
  victimRelationship: string;

}