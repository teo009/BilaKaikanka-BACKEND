import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Case } from './case.entity';
import { ViolenceType } from 'src/common/entities/violenceType.entity';

@Entity('cases-violencetype')
export class CaseViolence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  case_id: string;
  @ManyToOne(() => Case, (Case) => Case.caseViolence, { eager: true })
  @JoinColumn({ name: 'case_id' })
  case: Case;

  @Column('varchar')
  violenceType_id: string;
  @ManyToOne(
    () => ViolenceType,
    (violenceType) => violenceType.caseViolencetype,
    { eager: true },
  )
  @JoinColumn({ name: 'violenceType_id' })
  violenceType: ViolenceType;

  @DeleteDateColumn()
  deleteAt?: Date;
}
