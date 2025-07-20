import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm'
import { ProjectMember } from './ProjectMember'

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => ProjectMember, member => member.visitors, {
    onDelete: 'CASCADE',
  })
  project_member!: ProjectMember

  @Column()
  full_name!: string

  @Column({ nullable: true })
  institution?: string

  @Column({ type: 'timestamp' })
  visit_time!: Date

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date
}
