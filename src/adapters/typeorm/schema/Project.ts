import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  image_url!: string

  @OneToMany(() => ProjectMember, projectMember => projectMember.project, {
    nullable: true,
  })
  members?: ProjectMember[]

  @ManyToOne(() => Category, category => category.projects)
  @JoinColumn({ name: 'category_id' })
  category!: Category

  @ManyToOne(() => Event, event => event.projects)
  @JoinColumn({ name: 'event_id' })
  event!: Event

  @OneToMany(() => ProjectEvaluation, evaluation => evaluation.project)
  evaluations?: ProjectEvaluation[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
