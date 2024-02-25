import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Case } from "./case.entity";
import { Person } from "src/people/entities/person.entity";

import { 
  RoleInCase, 
  VictimRelationship, 
  Career, 
  Workplace, 
  JobPosition, 
  AcademicLevel 
} from "src/common/entities/";

@Entity('cases-people')
export class CasePerson {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(
    () => Case, 
    (Case) => Case.casePerson, 
    { eager: true, cascade: true }
  )
  case_id: Case;

  @ManyToOne(
    () => Person,
    (person) => person.casePerson
  )
  person_id: Person

  @ManyToOne(
    () => RoleInCase,
    (roleInCase) => roleInCase.casePerson
  )
  roleInCase: RoleInCase;

  @ManyToOne(
    () => VictimRelationship,
    (victimRelationship) => victimRelationship.casePerson
  )
  victimRelationship: VictimRelationship;

  @ManyToOne(
    () => Career,
    (career) => career.casePerson
  )
  career?: Career;

  @ManyToOne(
    () => Workplace,
    (workplace) => workplace.casePerson
  )
  workplace?: Workplace;

  @ManyToOne(
    () => JobPosition,
    (jobPosition) => jobPosition.casePerson
  )
  jobPosition?: JobPosition;

  @ManyToOne(
    () => AcademicLevel,
    (academicLevel) => academicLevel.casePerson
  )
  academicLevel: AcademicLevel;

  //TRACKING COLUMNS
  @CreateDateColumn({
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP' 
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleteAt?: Date;

}