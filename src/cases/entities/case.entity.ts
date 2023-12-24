import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CasePerson } from "./case-person.entity";

@Entity('case')
export class Case {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('number',  { unique: true })
  code: number;

  @Column('number', { unique: true }) 
  case_number: number

  @Column('text')
  narration: string; 

  @Column('text')
  place_of_events: string; 

  @Column('text')
  occurrence_time: string; //Check this type later

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIME'
  })
  occurrence_date: Date //save occurrence_hour too

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIME'
  })
  reception_date: Date; //save reception_hour too

  @ManyToOne(
    () => CasePerson,
    casePerson => casePerson.case_id,
  )
  casePerson: CasePerson;

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

  /*FOREIGN KEYS
  //user_update_id: ???;
  recinto_id
  municipio_id
  */

}