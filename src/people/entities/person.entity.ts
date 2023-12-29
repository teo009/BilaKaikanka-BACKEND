import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
