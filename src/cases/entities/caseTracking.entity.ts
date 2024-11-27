import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Case } from './case.entity';
import { TrackingStatus } from 'src/common/entities';

@Entity('cases-tracking')
export class CaseTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  description: string;

  @Column('varchar', { unique: true })
  caseId: string;
  @ManyToOne(() => Case, (Case) => Case.caseTracking, { eager: true })
  @JoinColumn({ name: 'caseId' })
  case: Case;

  @Column('varchar')
  trackingStatusId: string;
  @ManyToOne(
    () => TrackingStatus,
    (trackingStatus) => trackingStatus.caseTracking,
    { eager: true },
  )
  @JoinColumn({ name: 'trackingStatusId' })
  trackingStatus: TrackingStatus;

  @DeleteDateColumn()
  deleteAt?: Date;
}
