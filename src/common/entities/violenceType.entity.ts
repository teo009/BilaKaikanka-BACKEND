import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CaseViolence } from 'src/cases/entities/caseViolenctetype.entity';

@Entity()
export class ViolenceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => CaseViolence, (caseViolence) => caseViolence.violenceType)
  caseViolencetype: CaseViolence;

  @DeleteDateColumn()
  deleteAt?: Date;
}
