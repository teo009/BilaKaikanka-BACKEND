import { CasePerson } from "src/cases/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Career {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  careerName: string

  @OneToMany(
  () => CasePerson,
  (CasePerson) => CasePerson.career
  )
  casePerson: CasePerson;

}