import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Career,
  Workplace,
  Municipality,
  JobPosition,
  IdentityType,
  AcademicLevel,
  RegionalCenter,
} from 'src/common/entities/';

import { CasePerson } from 'src/cases/entities';
import { ValidEthnicities } from 'src/common/enums/';

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  secondName: string;

  @Column({ type: 'timestamptz' })
  birthDate: Date;

  @Column('text')
  gender: string;

  @Column({ type: 'enum', enum: ValidEthnicities })
  ethnicity: ValidEthnicities;

  @Column('int', { array: true })
  phoneNumbers: number[];

  @Column('text')
  homeAddress: string;

  @Column('text', { unique: true })
  identity: string;

  @OneToMany(() => CasePerson, (casePerson) => casePerson.person)
  casePerson: CasePerson;

  @Column('varchar')
  career_id: string;
  @ManyToOne(() => Career, (career) => career.person, { cascade: true })
  @JoinColumn({ name: 'career_id' })
  career: Career;

  @Column('varchar')
  workplace_id: string;
  @ManyToOne(() => Workplace, (workplace) => workplace.person)
  @JoinColumn({ name: 'workplace_id' })
  workplace: Workplace;

  @Column('varchar')
  municipality_id: string;
  @ManyToOne(() => Municipality, (municipality) => municipality.person)
  @JoinColumn({ name: 'municipality_id' })
  municipality: Municipality;

  @Column('varchar')
  regionalCenter_id: string;
  @ManyToOne(() => RegionalCenter, (regionalCenter) => regionalCenter.person)
  @JoinColumn({ name: 'regionalCenter_id' })
  regionalCenter: RegionalCenter;

  @Column('varchar')
  jobposition_id: string;
  @ManyToOne(() => JobPosition, (jobposition) => jobposition.person)
  @JoinColumn({ name: 'jobposition_id' })
  jobposition: JobPosition;

  @Column('varchar')
  identityType_id: string;
  @ManyToOne(() => IdentityType, (identitytype) => identitytype.person)
  @JoinColumn({ name: 'identityType_id' })
  identitytype: IdentityType;

  @Column('varchar')
  academicLevel_id: string;
  @ManyToOne(() => AcademicLevel, (academicLevel) => academicLevel.person)
  @JoinColumn({ name: 'academicLevel_id' })
  academicLevel: AcademicLevel;

  @DeleteDateColumn()
  deleteAt?: Date;
}
