import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CaseTracking } from "src/cases/entities/caseTracking.entity";

@Entity()
export class TrackingStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(
    () => CaseTracking, (caseTracking) => caseTracking.trackingStatus
  )
  caseTracking: CaseTracking;

  @DeleteDateColumn()
  deleteAt?: Date;
}