import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EvaluationQuestions } from "./EvaluationQuestions";
import { Project } from "./Project";

@Entity()
export class ProjectCategories {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @ManyToMany(() => EvaluationQuestions, (question) => question.categories)
  @JoinTable()
  questions!: EvaluationQuestions[]

  @ManyToOne(() => Project, project => project.category)
  project!: Project[]
}