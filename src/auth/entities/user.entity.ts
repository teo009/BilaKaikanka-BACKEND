import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from 'src/common/enums/valid-roles.interface';

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
    default: ValidRoles.digitizer,
    enum: ValidRoles,
  })
  role: ValidRoles;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
