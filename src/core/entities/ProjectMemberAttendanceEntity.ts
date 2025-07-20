import { AttendanceSessionEntity } from './AttendanceSessionEntity'
import { ProjectMemberEntity } from './ProjectMemberEntity'

export class ProjectMemberAttendanceEntity {
  id: string
  session: AttendanceSessionEntity
  project_member: ProjectMemberEntity
  status: 'present' | 'absent' | 'justified' | 'pending'
  comment?: string
  timestamp: Date

  constructor(data: ProjectMemberAttendanceEntity) {
    this.id = data.id
    this.session = data.session
    this.project_member = data.project_member
    this.status = data.status
    this.comment = data.comment
    this.timestamp = data.timestamp
  }
}
