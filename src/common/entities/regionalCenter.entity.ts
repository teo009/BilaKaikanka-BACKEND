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

  @DeleteDateColumn()
  deleteAt?: Date;
}
