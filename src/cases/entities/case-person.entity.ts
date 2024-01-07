import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Case } from "./case.entity";
import { Person } from "src/people/entities/person.entity";

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

  /* 
  FOREIGN KEYS
  person_id
  rol_id
  relationship_id
  career_id (optional)
  work_place_id (optional)
  cargo_id (optional)
  nivel_académico_id
  */

}