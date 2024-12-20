import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Case } from './case.entity';
import { Person } from 'src/people/entities/person.entity';

import {
  RoleInCase,
  VictimRelationship,
  Career,
  Workplace,
  JobPosition,
  AcademicLevel,
} from 'src/common/entities/';

@Entity('cases_people')
export class CasePerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  case_id: string;
  @ManyToOne(() => Case, (Case) => Case.casePerson, { eager: true })
  @JoinColumn({ name: 'case_id' })
  case: Case;

  @Column('varchar')
  person_id: string;
  @ManyToOne(() => Person, (person) => person.casePerson)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column('varchar')
  roleInCase_id: string;
  @ManyToOne(() => RoleInCase, (roleInCase) => roleInCase.casePerson)
  @JoinColumn({ name: 'roleInCase_id' })
  roleInCase: RoleInCase;

  @Column('varchar')
  victimRelationship_id: string;
  @ManyToOne(
    () => VictimRelationship,
    (victimRelationship) => victimRelationship.casePerson,
  )
  @JoinColumn({ name: 'victimRelationship_id' })
  victimRelationship: VictimRelationship;

  @Column('varchar')
  career_id: string;
  @ManyToOne(() => Career, (career) => career.casePerson)
  @JoinColumn({ name: 'career_id' })
  career?: Career;

  @Column('varchar')
  workplace_id: string;
  @ManyToOne(() => Workplace, (workplace) => workplace.casePerson)
  @JoinColumn({ name: 'workplace_id' })
  workplace?: Workplace;

  @Column('varchar')
  jobPosition_id: string;
  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.casePerson)
  @JoinColumn({ name: 'jobPosition_id' })
  jobPosition?: JobPosition;

  @Column('varchar')
  academicLevel_id: string;
  @ManyToOne(() => AcademicLevel, (academicLevel) => academicLevel.casePerson)
  @JoinColumn({ name: 'academicLevel_id' })
  academicLevel: AcademicLevel;

  //TRACKING COLUMNS
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleteAt?: Date;
}
