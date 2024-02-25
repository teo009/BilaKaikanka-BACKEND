import {
  Column,
  DeleteDateColumn,
  Entity,
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
} from 'src/common/entities/';

import { CasePerson } from 'src/cases/entities';

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

  @Column('int', { array: true })
  phoneNumbers: number[];

  @Column('text')
  homeAddress: string;

  @Column('text', { unique: true })
  identity: string;

  @OneToMany(() => CasePerson, (casePerson) => casePerson.person_id)
  casePerson: CasePerson;

  @ManyToOne(() => Career, (career) => career.person, { cascade: true })
  career: Career;

  @ManyToOne(() => Workplace, (workplace) => workplace.person)
  workplace: Workplace;

  @ManyToOne(() => Municipality, (municipality) => municipality.person)
  municipality: Municipality;

  @ManyToOne(() => JobPosition, (jobposition) => jobposition.person)
  jobposition: JobPosition;

  @ManyToOne(() => IdentityType, (identityType) => identityType.person)
  identityType: IdentityType;

  @ManyToOne(() => AcademicLevel, (academicLevel) => academicLevel.person)
  academicLevel: AcademicLevel;

  @DeleteDateColumn()
  deleteAt?: Date;
}
