import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EvaluationQuestions } from "./EvaluationQuestions";

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
}