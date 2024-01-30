import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Municipality {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  municipalityName: string;

}