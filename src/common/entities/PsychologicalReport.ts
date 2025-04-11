import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PsychologicalReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  /*@Column('text', { unique: true })
  fileUrl: string;*/

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @DeleteDateColumn()
  deleteAt?: Date;

  @Column('text')
  createdBy: string;
}
