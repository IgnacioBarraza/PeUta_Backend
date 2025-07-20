import { VisitorEntity } from '../../../core/entities/VisitorEntity'
import { Visitor } from '../schema/Visitor'
import { ProjectMemberMapper } from './ProjectMemberMapper'

export const VisitorMapper = {
  toDomain(raw: Visitor): VisitorEntity {
    return new VisitorEntity({
      id: raw.id,
      project_member: ProjectMemberMapper.toDomain(raw.project_member),
      full_name: raw.full_name,
      institution: raw.institution,
      visit_time: raw.visit_time,
      created_at: raw.created_at,
    })
  },
  toSchema(raw: VisitorEntity): Visitor {
    const visitor = new Visitor()
    visitor.id = raw.id
    visitor.project_member = ProjectMemberMapper.toSchema(raw.project_member)
    visitor.full_name = raw.full_name
    visitor.institution = raw.institution
    visitor.visit_time = raw.visit_time
    visitor.created_at = raw.created_at
    return visitor
  },
}
