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
export class AcademicLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => CasePerson, (casePerson) => casePerson.academicLevel)
  casePerson: CasePerson;

  @OneToMany(() => Person, (person) => person.academicLevel)
  person: Person;

  @DeleteDateColumn()
  deleteAt?: Date;
}
