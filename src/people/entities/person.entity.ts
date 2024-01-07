import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { CasePerson } from "src/cases/entities";

@Entity('people')
export class Person {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstName: string

  @Column('text')
  secondName: string
  
  @Column({ type: 'timestamptz' })
  birthDate: Date; 

  @Column('int', { array: true })
  phoneNumbers: number[];

  @Column('text')
  homeAddress: string;

  @Column('text', { unique: true })
  identity: string;

  @OneToMany(
    () => CasePerson,
    (casePerson) => casePerson.person_id,
  )
  casePerson: CasePerson;

  //FOREIGN KEYS
  /*tipoIdentidad_id
  cargo_id
  nivelAcademico_id
  carrera_id
  centroTrabajo_id
  municipio_id
  carrera_id
  centroTrabajo_id
  municipio_id*/
}
