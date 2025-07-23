import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Event } from './Event'
import { EvaluationQuestion } from './EvaluationQuestion'

@Entity()
export class EvaluationForm {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column('text')
  description!: string

  @ManyToOne(() => Event, event => event.forms, {
    onDelete: 'CASCADE',
  })
  event?: Event

  @OneToMany(() => EvaluationQuestion, q => q.form)
  questions?: EvaluationQuestion[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
