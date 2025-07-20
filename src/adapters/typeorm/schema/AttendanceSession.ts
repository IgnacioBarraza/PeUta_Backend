import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Event } from './Event'

@Entity()
export class AttendanceSession {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Event, event => event.attendance_sessions, {
    onDelete: 'CASCADE',
  })
  event!: Event

  @Column()
  name!: string

  @Column({ type: 'timestamp with time zone' })
  date!: Date

  @Column({ type: 'time' })
  start_time!: string

  @Column({ type: 'time' })
  end_time!: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
