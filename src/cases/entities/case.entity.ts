import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CasePerson } from './casePerson.entity';
import { CaseViolence } from './caseViolenctetype.entity';
import { RegionalCenter, Municipality } from 'src/common/entities/';
import { CaseTracking } from './caseTracking.entity';

@Entity('case')
export class Case {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { unique: true })
  code: number;

  @Column('int', { unique: true })
  case_number: number;

  @Column('text')
  narration: string;

  @Column('text')
  place_of_events: string;

  @Column('text')
  occurrence_time: string; //Check this type later

  @Column({
    type: 'timestamptz',
    //default: () => 'CURRENT_TIME'
  })
  occurrence_date: Date; //save occurrence_hour too

  @Column({
    type: 'timestamptz',
    //default: () => 'CURRENT_TIME'
  })
  reception_date: Date; //save reception_hour too

  @OneToMany(() => CasePerson, (casePerson) => casePerson.case)
  casePerson: CasePerson;

  @OneToMany(() => CaseViolence, (caseViolence) => caseViolence.case)
  caseViolence: CaseViolence;

  @OneToMany(() => CaseTracking, (caseTracking) => caseTracking.case)
  caseTracking: CaseTracking;

  @Column('varchar')
  regionalCenter_id: string;
  @ManyToOne(() => RegionalCenter, (regionalCenter) => regionalCenter.cases)
  @JoinColumn({ name: 'regionalCenter_id' })
  regionalCenter: RegionalCenter;

  @Column('varchar')
  municipality_id: string;
  @ManyToOne(() => Municipality, (municipality) => municipality.case)
  @JoinColumn({ name: 'municipality_id' })
  municipality: Municipality;

  @DeleteDateColumn()
  deleteAt?: Date;

  /*@CreateDateColumn({
    type: 'timestamp', 
    default: () => 'CURRENT_TIME' 
  })
  created_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIME'
  })
  updated_at: Date;*/
  //user_update_id: ???;
}
