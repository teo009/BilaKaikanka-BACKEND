import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Case } from "src/cases/entities";

@Entity()
export class Municipality {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  municipalityName: string;

  @OneToMany(
    () => Case,
    (Case) => Case.municipality 
  )
  case: Case;

}