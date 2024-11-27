import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Case } from 'src/cases/entities';
import { Person } from 'src/people/entities/person.entity';

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => Case, (Case) => Case.municipality)
  case: Case;

  @OneToMany(() => Person, (person) => person.municipality)
  person: Person;

  @DeleteDateColumn()
  deleteAt?: Date;
}
