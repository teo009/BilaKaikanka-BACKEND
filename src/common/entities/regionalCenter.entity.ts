import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Case } from 'src/cases/entities';

@Entity()
export class RegionalCenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => Case, (Case) => Case.regionalCenter)
  cases: Case;

  @DeleteDateColumn()
  deleteAt?: Date;
}
