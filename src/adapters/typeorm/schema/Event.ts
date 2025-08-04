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

export enum EventStatus {
  Pending = 'pending',
  Active = 'active',
  Completed = 'completed',
  Archived = 'archived',
  Canceled = 'canceled',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  name!: string

  @Column({ nullable: true })
  sub_title?: string

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

  @Column({
    type: 'varchar',
    default: 'email',
    nullable: false,
  })
  registration_method!: 'email' | 'rut' | 'both'

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  allow_public_evaluation!: boolean

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.Pending })
  status!: EventStatus

  @ManyToOne(() => Client, client => client.events)
  @JoinColumn({ name: 'client_id' })
  @Index()
  client!: Client

  @OneToMany(() => Project, project => project.event, { nullable: true })
  projects?: Project[]

  @OneToMany(() => Category, category => category.event, { nullable: true })
  categories?: Category[]

  @OneToMany(() => EvaluationForm, form => form.event, { nullable: true })
  forms?: EvaluationForm[]

  @OneToMany(() => EvaluationReviewer, reviewer => reviewer.event, {
    nullable: true,
  })
  reviewers?: EvaluationReviewer[]

  @OneToMany(() => AttendanceSession, attendance => attendance.event, {
    nullable: true,
  })
  attendance_sessions?: AttendanceSession[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
