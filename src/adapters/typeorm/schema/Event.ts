import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Client } from './Client'
import { Project } from './Project'
import { Category } from './Category'
import { EvaluationForm } from './EvaluationForm'
import { EvaluationReviewer } from './EvaluationReviewer'
import { AttendanceSession } from './AttendanceSession'

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  name!: string

  @Column()
  description!: string

  @Column({ type: 'timestamp with time zone' })
  date_start!: Date

  @Column({ type: 'timestamp with time zone' })
  date_end!: Date

  @Column()
  location!: string

  @Column()
  banner_url!: string

  @ManyToOne(() => Client, client => client.events)
  @JoinColumn({ name: 'client_id' })
  @Index()
  client!: Client

  @OneToMany(() => Project, project => project.event)
  projects!: Project[]

  @OneToMany(() => Category, category => category.event)
  categories!: Category[]

  @OneToMany(() => EvaluationForm, form => form.event)
  forms!: EvaluationForm[]

  @OneToMany(() => EvaluationReviewer, reviewer => reviewer.event)
  reviewers!: EvaluationReviewer[]

  @OneToMany(() => AttendanceSession, attendance => attendance.event)
  attendance_sessions!: AttendanceSession[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
