import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Evaluations } from './Evaluations'
import { ProjectCategories } from './ProjectCategories'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  projectName!: string

  @Column()
  description!: string

  @OneToMany(() => ProjectCategories, category => category.project)
  category!: ProjectCategories

  @Column()
  imageUrl!: string

  @Column({ type: 'float', default: 0, nullable: true })
  averageScore?: number

  @Column({ type: 'jsonb', nullable: false, default: '[]' })
  members!: {
    name: string
    lastName: string
  }[]

  @OneToMany(() => Evaluations, evaluations => evaluations.project)
  evaluations!: Evaluations[]
}
