import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class RegionalCenter {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  regionalCenter: string;

}