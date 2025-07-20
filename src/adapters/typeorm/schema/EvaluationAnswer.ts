import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProjectEvaluation } from './ProjectEvaluation'
import { EvaluationQuestion } from './EvaluationQuestion'

@Entity()
export class EvaluationAnswer {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => ProjectEvaluation, evaluation => evaluation.answers, {
    onDelete: 'CASCADE',
  })
  evaluation!: ProjectEvaluation

  @ManyToOne(() => EvaluationQuestion, { eager: true })
  question!: EvaluationQuestion

  @Column('float')
  score!: number

  @Column({ type: 'text', nullable: true })
  comment?: string
}
