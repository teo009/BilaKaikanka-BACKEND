import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CasePerson } from "src/cases/entities";

@Entity()
export class Workplace {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  workplace: string;

  @OneToMany(
    () => CasePerson,
    (casePerson) => casePerson.workplace
  )
  casePerson: CasePerson;

}