import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Evaluations } from './Evaluations'
import { EvaluationQuestions } from './EvaluationQuestions'

@Entity()
export class EvaluationScores {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column({ type: 'float', default: 0 })
  score!: number

  @ManyToOne(() =>  Evaluations, evaluations => evaluations.evaluationScores)
  evaluations!: Evaluations

  @ManyToOne(() =>  EvaluationQuestions, questions => questions.evaluationScores)
  questions!: EvaluationQuestions
}
