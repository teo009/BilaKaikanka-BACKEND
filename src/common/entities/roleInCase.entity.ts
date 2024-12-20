import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Case, CasePerson } from 'src/cases/entities';

@Entity('role_in_case')
export class RoleInCase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => CasePerson, (CasePerson) => CasePerson.roleInCase)
  casePerson: Case;

  @DeleteDateColumn()
  deleteAt?: Date;
}
