import { CasePerson } from "src/cases/entities";
import { Person } from "src/people/entities/person.entity";
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

  @OneToMany(
    () => Person,
    (person) => person.career
  )
  person: Person;

}