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
export class JobPosition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => CasePerson, (casePerson) => casePerson.jobPosition)
  casePerson: CasePerson;

  @OneToMany(() => Person, (person) => person.jobposition)
  person: Person;

  @DeleteDateColumn()
  deleteAt?: Date;
}
