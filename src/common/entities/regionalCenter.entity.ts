import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Case } from 'src/cases/entities';
import { User } from 'src/auth/entities/user.entity';
import { Person } from 'src/people/entities/person.entity';

@Entity()
export class RegionalCenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @ManyToOne(() => Case, (Case) => Case.regionalCenter)
  cases: Case;

  @OneToMany(() => User, (user) => user.regionalCenter)
  user: User;

  @OneToMany(() => Person, (person) => person.regionalCenter)
  person: Person;

  @DeleteDateColumn()
  deleteAt?: Date;
}
