import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CasePerson } from 'src/cases/entities';
import { Person } from 'src/people/entities/person.entity';

@Entity()
export class Workplace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => CasePerson, (casePerson) => casePerson.workplace)
  casePerson: CasePerson;

  @OneToMany(() => Person, (person) => person.workplace)
  person: Person;

  @DeleteDateColumn()
  deleteAt?: Date;
}
