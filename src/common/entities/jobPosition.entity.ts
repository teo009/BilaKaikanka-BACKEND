import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CasePerson } from "src/cases/entities";

@Entity()
export class JobPosition {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  jobPosition: string;

  @OneToMany(
    () => CasePerson,
    (casePerson) => casePerson.jobPosiion
  )
  casePerson: CasePerson;

}