import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { CategoryEntity } from '../entities/CategoryEntity'
import { CategoryRepository } from '../ports/CategoryRepository'
import { EventRepository } from '../ports/EventRepository'
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from '../validations/CategoryValidation'

export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private eventRepository: EventRepository
  ) {}

  async getAllCategories(api_key: string): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.getAllCategories(api_key)

    if (categories.length === 0)
      throw new CustomError('No categories found', 404, ['No categories found'])
    return categories
  }

  async getCategoryById(id: string, api_key: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.getCategoryById(id, api_key)

    if (!category)
      throw new CustomError('Category not found', 404, ['Category not found'])
    return category
  }

  async getCategoriesByEvent(
    api_key: string,
    eventId: string
  ): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.getCategoriesByEvent(
      api_key,
      eventId
    )
    if (categories.length === 0)
      throw new CustomError('No categories found', 404, ['No categories found'])
    return categories
  }

  async createCategory(
    api_key: string,
    category: Partial<CategoryEntity>
  ): Promise<CategoryEntity> {
    const parsedData = CreateCategorySchema.strict().safeParse(category)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error.errors)

    const data = parsedData.data

    const event = await this.eventRepository.getEventByIdAndApikey(
      data.event_id,
      api_key
    )
    if (!event)
      throw new CustomError('Event not found', 404, ['Event not found'])

    const newCategory = await this.categoryRepository.createCategory({
      ...data,
      event: event,
    })

    if (!newCategory)
      throw new CustomError('Category not created', 500, [
        'Category not created',
      ])

    return newCategory
  }

  async updateCategory(
    api_key: string,
    id: string,
    category: Partial<CategoryEntity>
  ): Promise<CategoryEntity> {
    const parsedData = UpdateCategorySchema.strict().safeParse(category)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    const data = parsedData.data

    const updatedCategory = await this.categoryRepository.updateCategory(
      api_key,
      id,
      data
    )
    if (!updatedCategory)
      throw new CustomError('Category not updated', 500, [
        'Category not updated',
      ])

    return updatedCategory
  }

  async deleteCategory(api_key: string, id: string): Promise<boolean> {
    const deleted = await this.categoryRepository.deleteCategory(api_key, id)

    if (!deleted)
      throw new CustomError('Category not deleted', 500, [
        'Category not deleted',
      ])

    return deleted
  }
}
