import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Case } from "./case.entity";

@Entity('cases-violencetype')
export class CaseViolence {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Case,
    (Case) => Case.caseViolence
  )
  case: Case;

}