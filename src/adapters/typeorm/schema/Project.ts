import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from './Category'
import { Event } from './Event'
import { ProjectMember } from './ProjectMember'
import { ProjectEvaluation } from './ProjectEvaluation'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column()
  description!: string

  @Column()
  imageUrl!: string

  @OneToMany(() => ProjectMember, projectMember => projectMember.project)
  members!: ProjectMember[]

  @ManyToMany(() => Category, category => category.projects)
  @JoinTable({
    name: 'project_category',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories!: Category[]

  @ManyToOne(() => Event, event => event.projects)
  @JoinColumn({ name: 'event_id' })
  event!: Event

  @OneToMany(() => ProjectEvaluation, evaluation => evaluation.project)
  evaluations!: ProjectEvaluation[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
