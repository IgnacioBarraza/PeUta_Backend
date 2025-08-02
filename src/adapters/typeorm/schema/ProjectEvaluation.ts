import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Project } from './Project'
import { User } from './User'
import { EvaluationForm } from './EvaluationForm'
import { EvaluationAnswer } from './EvaluationAnswer'

@Entity()
export class ProjectEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Project, project => project.evaluations, {
    onDelete: 'CASCADE',
  })
  project?: Project

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  evaluator!: User

  @ManyToOne(() => EvaluationForm, { eager: true })
  form?: EvaluationForm

  @Column('float')
  final_score!: number

  @OneToMany(() => EvaluationAnswer, answer => answer.evaluation)
  answers?: EvaluationAnswer[]

  @Column({ type: 'text', nullable: true })
  comment?: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date
}
