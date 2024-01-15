import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Case } from "./case.entity";
import { Person } from "src/people/entities/person.entity";
import { RoleInCase } from "src/common/entities/roleInCase.entity";
import { VictimRealationship } from "src/common/entities/VictimRelationship.entity";
import { Career } from "src/common/entities/Career.entity";

@Entity('cases-people')
export class CasePerson {

  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    () => VictimRealationship,
    (victimRelationship) => victimRelationship.casePerson
  )
  victimRelationship: VictimRealationship;

  @ManyToOne(
    () => Career,
    (career) => career.casePerson
  )
  career?: Career;

  /* 
  FOREIGN KEYS
  work_place_id (optional)
  cargo_id (optional)
  nivel_académico_id
  */

}