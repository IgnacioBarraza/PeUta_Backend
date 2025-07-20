import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { EvaluationForm } from './EvaluationForm'

@Entity()
export class EvaluationQuestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => EvaluationForm, form => form.questions, {
    onDelete: 'CASCADE',
  })
  form!: EvaluationForm

  @Column('text')
  question!: string

  @Column('float')
  weigth!: number

  @Column()
  order!: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
