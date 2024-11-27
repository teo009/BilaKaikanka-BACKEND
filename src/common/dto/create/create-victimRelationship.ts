import { IsString } from 'class-validator';

export class CreateVictimRelationship {
  @IsString()
  name: string;
}
