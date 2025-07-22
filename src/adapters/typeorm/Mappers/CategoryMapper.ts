import { CategoryEntity } from '../../../core/entities/CategoryEntity'
import { Category } from '../schema/Category'
import { EventMapper } from './EventMapper'
import { ProjectMapper } from './ProjectMapper'

export const CategoryMapper = {
  toDomain(raw: Category): CategoryEntity {
    return new CategoryEntity({
      id: raw.id,
      name: raw.name,
      description: raw.description,
      event: raw.event ? EventMapper.toDomain(raw.event) : undefined,
      projects: raw.projects?.map(ProjectMapper.toDomain) ?? [],
    })
  },
  toSchema(raw: CategoryEntity): Category {
    const category = new Category()
    category.id = raw.id
    category.name = raw.name
    category.description = raw.description
    category.event = raw.event ? EventMapper.toSchema(raw.event) : undefined
    category.projects = raw.projects?.map(ProjectMapper.toSchema) ?? []
    return category
  },
}
