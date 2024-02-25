import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CasePerson } from 'src/cases/entities';

//Parentezco
@Entity('victim-relationship')
export class VictimRelationship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  victimRelationship: string;

  @OneToMany(() => CasePerson, (casePerson) => casePerson.victimRelationship)
  casePerson: CasePerson;

  @DeleteDateColumn()
  deleteAt?: Date;
}
