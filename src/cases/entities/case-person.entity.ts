import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Case } from "./case.entity";

@Entity('cases-people')
export class CasePerson {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  text: string;
  
  @OneToMany(
    () => Case, (Case) => Case.casePerson, { eager: true, cascade: true }
  )
  case_id: Case;

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