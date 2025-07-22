import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { Project } from './Project'
import { ProjectMemberAttendance } from './ProjectMemberAttendance'
import { Visitor } from './Visitor'

@Entity()
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Project, project => project.members)
  @JoinColumn({ name: 'project_id' })
  project?: Project

  @Column()
  full_name!: string

  @OneToMany(
    () => ProjectMemberAttendance,
    attendance => attendance.project_member
  )
  attendance_records!: ProjectMemberAttendance[]

  @OneToMany(() => Visitor, visitor => visitor.project_member)
  visitors!: Visitor[]
}
