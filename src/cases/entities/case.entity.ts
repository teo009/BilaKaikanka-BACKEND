import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CasePerson } from "./case-person.entity";
import { RegionalCenter } from "src/common/entities/regionalCenter.entity";
import { Municipality } from "src/common/entities/municipality.entity";

@Entity('case')
export class Case {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int',  { unique: true })
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
  occurrence_date: Date //save occurrence_hour too

  @Column({
    type: 'timestamptz',
    //default: () => 'CURRENT_TIME'
  })
  reception_date: Date; //save reception_hour too

  @OneToMany(
    () => CasePerson,
    (casePerson) => casePerson.case_id,
  )
  casePerson: CasePerson;

  @ManyToOne(
    () => RegionalCenter,
    (regionalCenter) => regionalCenter.cases
  )
  regionalCenter: RegionalCenter;

  @ManyToOne(
    () => Municipality,
    (municipality) => municipality.case
  )
  municipality: Municipality;

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
  municipio_id
  */

}