import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProjectCategories } from './ProjectCategories'
import { EvaluationScores } from './EvaluationScores'

@Entity()
export class EvaluationQuestions {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column({ type: 'float', nullable: false })
  weight!: number

  @Column()
  question!: string

  @Column()
  minScore!: number

  @Column()
  maxScore!: number

  @ManyToMany(() => ProjectCategories, (category) => category.questions)
  categories!: ProjectCategories[]

  @OneToMany(() => EvaluationScores, scores => scores.questions)
  evaluationScores!: EvaluationScores
}
