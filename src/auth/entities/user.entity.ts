import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ValidRoles } from 'src/common/enums/valid-roles.interface';
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

  @Column('varchar', { nullable: true })
  regionalCenterId: string;
  @ManyToMany(() => RegionalCenter, (regionalCenter) => regionalCenter.user)
  @JoinColumn({ name: 'regionalCenterId' })
  regionalCenter: RegionalCenter;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
