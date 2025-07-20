import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AttendanceSession } from './AttendanceSession'
import { ProjectMember } from './ProjectMember'

@Entity()
export class ProjectMemberAttendance {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => AttendanceSession, session => session.id, {
    onDelete: 'CASCADE',
  })
  session!: AttendanceSession

  @ManyToOne(() => ProjectMember, member => member.attendance_records, {
    onDelete: 'CASCADE',
  })
  project_member!: ProjectMember

  @Column({ default: 'pendiente' })
  status!: 'presente' | 'ausente' | 'justificado' | 'pendiente'

  @Column({ type: 'text', nullable: true })
  comment!: string

  @Column({ type: 'timestamp' })
  timestamp!: Date
}
