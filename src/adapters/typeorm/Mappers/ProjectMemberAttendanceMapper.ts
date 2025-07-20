import { ProjectMemberAttendanceEntity } from '../../../core/entities/ProjectMemberAttendanceEntity'
import { ProjectMemberAttendance } from '../schema/ProjectMemberAttendance'
import { AttendanceSessionMapper } from './AttendanceSessionMapper'
import { ProjectMemberMapper } from './ProjectMemberMapper'

export const ProjectMemberAttendanceMapper = {
  toDomain(raw: ProjectMemberAttendance): ProjectMemberAttendanceEntity {
    return new ProjectMemberAttendanceEntity({
      id: raw.id,
      session: AttendanceSessionMapper.toDomain(raw.session),
      project_member: ProjectMemberMapper.toDomain(raw.project_member),
      status: raw.status,
      comment: raw.comment,
      timestamp: raw.timestamp,
    })
  },
  toSchema(raw: ProjectMemberAttendanceEntity): ProjectMemberAttendance {
    const memberAttendance = new ProjectMemberAttendance()
    memberAttendance.id = raw.id
    memberAttendance.session = AttendanceSessionMapper.toSchema(raw.session)
    memberAttendance.project_member = ProjectMemberMapper.toSchema(
      raw.project_member
    )
    memberAttendance.status = raw.status
    memberAttendance.comment = raw.comment
    memberAttendance.timestamp = raw.timestamp
    return memberAttendance
  },
}
