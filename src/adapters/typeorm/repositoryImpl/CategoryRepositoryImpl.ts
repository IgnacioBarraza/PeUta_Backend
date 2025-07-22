import { DataSource, Repository } from 'typeorm'
import { CategoryRepository } from '../../../core/ports/CategoryRepository'
import { Category } from '../schema/Category'
import { CategoryEntity } from '../../../core/entities/CategoryEntity'
import { CategoryMapper } from '../Mappers/CategoryMapper'
import { EventService } from '../../../core/services/EventService'

export class CategoryRepositoryImpl implements CategoryRepository {
  private db: DataSource
  private categoryRepository: Repository<Category>
  private eventService: EventService

  constructor(db: DataSource, eventService: EventService) {
    this.db = db
    this.categoryRepository = db.getRepository(Category)
    this.eventService = eventService
  }

  async getAllCategories(api_key: string): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      where: {
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
      relations: {
        projects: true,
        event: {
          client: true,
        },
      },
    })

    return categories.map(c => CategoryMapper.toDomain(c))
  }

  async getCategoryById(
    api_key: string,
    id: string
  ): Promise<CategoryEntity | null> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
      relations: {
        projects: true,
        event: {
          client: true,
        },
      },
    })

    return category ? CategoryMapper.toDomain(category) : null
  }

  async getCategoriesByEvent(
    api_key: string,
    eventId: string
  ): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      where: {
        event: {
          id: eventId,
          client: {
            api_key: api_key,
          },
        },
      },
      relations: {
        projects: true,
        event: {
          client: true,
        },
      },
    })

    return categories.map(c => CategoryMapper.toDomain(c))
  }

  async createCategory(
    api_key: string,
    category: CategoryEntity
  ): Promise<CategoryEntity> {
    const event = await this.eventService.getEventByIdAndApikey(
      category.event.id,
      api_key
    )

    const newCategory = this.categoryRepository.create({
      ...category,
      event: event,
    })

    const savedCategory = await this.categoryRepository.save(newCategory)

    return CategoryMapper.toDomain(savedCategory)
  }

  async updateCategory(
    api_key: string,
    id: string,
    category: CategoryEntity
  ): Promise<CategoryEntity | null> {
    const existingCategory = await this.categoryRepository.findOne({
      where: {
        id: id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
    })

    if (!existingCategory) return null

    await this.categoryRepository.update(id, category)

    return await this.getCategoryById(api_key, id)
  }

  async deleteCategory(api_key: string, id: string): Promise<boolean> {
    const event = await this.categoryRepository.findOne({
      where: {
        id: id,
        event: {
          client: {
            api_key: api_key,
          },
        },
      },
    })

    if (!event) return false

    await this.categoryRepository.delete(id)

    return true
  }
}
