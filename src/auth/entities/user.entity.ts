import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  //JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ValidRoles } from 'src/common/enums/';
import { RegionalCenter } from 'src/common/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ValidRoles,
  })
  role: ValidRoles;

  @ManyToOne(() => RegionalCenter, (regionalCenter) => regionalCenter.user, {
    nullable: true,
  })
  regionalCenter: RegionalCenter | null;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
