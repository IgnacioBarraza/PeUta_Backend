import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { Project } from './Project'
import { EvaluationScores } from './EvaluationScores'

@Entity()
export class Evaluations {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column({ type: 'float', default: 0 })
  finalScore!: number

  @Column('timestamp')
  createdAt!: string

  @ManyToOne(() => User, (user) => user.evaluations, { eager: true })
  user!: User

  @ManyToOne(() => Project, (project) => project.evaluations, { eager: true })
  project!: Project

  @OneToMany(() => EvaluationScores, scores => scores.evaluations)
  evaluationScores!: EvaluationScores[]
}
