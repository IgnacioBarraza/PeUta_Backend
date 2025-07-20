import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'
import { User } from './User'
import { Event } from './Event'

@Entity()
export class EvaluationReviewer {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Event, event => event.reviewers, { onDelete: 'CASCADE' })
  event!: Event

  @ManyToOne(() => User)
  user!: User

  @Column()
  role!: string // ej: jurado, profesor, etc

  @Column({ type: 'int', nullable: true })
  assigned_forms?: number
}
