import { Person } from "src/people/entities/person.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class IdentityType {

  @PrimaryGeneratedColumn('uuid')
  is: string;

  @Column('text', { unique: true })
  identityType: string;

  @OneToMany(
    () => Person,
    (person) => person.identityType
  )
  person: Person;

}