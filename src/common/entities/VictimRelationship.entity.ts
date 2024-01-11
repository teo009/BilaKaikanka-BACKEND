import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//Parentezco
@Entity('victim-relationship')
export class VictimRealationship {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  victimRelationship: string;

}