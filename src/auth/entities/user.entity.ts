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
  checkFieldsBeforeInsert(): void {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  async checkEmailAndPassword(): Promise<void> {
    this.checkFieldsBeforeInsert();
    /*if (this.password) {
      try {
        this.password = await bcrypt.hashSync(this.password, 10);
      } catch (error) {
        throw new InternalServerErrorException(
          'Error in hash process before update',
        );
      }
    }*/
  }
}
