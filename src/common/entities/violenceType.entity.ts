import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CaseViolence } from 'src/cases/entities/case-violenctetype.entity';

@Entity()
export class ViolenceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  violenceType: string;

  @OneToMany(() => CaseViolence, (caseViolence) => caseViolence.violenceType)
  caseViolencetype: CaseViolence;

  @DeleteDateColumn()
  deleteAt?: Date;
}
