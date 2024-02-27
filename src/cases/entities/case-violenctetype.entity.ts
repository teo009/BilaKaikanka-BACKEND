import {
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Case } from './case.entity';
import { ViolenceType } from 'src/common/entities/violenceType.entity';

@Entity('cases-violencetype')
export class CaseViolence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Case, (Case) => Case.caseViolence, { eager: true })
  case: Case;

  @ManyToOne(
    () => ViolenceType,
    (violenceType) => violenceType.caseViolencetype,
    { eager: true },
  )
  violenceType: ViolenceType;

  @DeleteDateColumn()
  deleteAt?: Date;
}
