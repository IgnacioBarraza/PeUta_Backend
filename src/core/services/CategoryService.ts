import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { CategoryEntity } from '../entities/CategoryEntity'
import { CategoryRepository } from '../ports/CategoryRepository'
import { CreateCategorySchema } from '../validations/CategoryValidation'

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

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
    if (!parsedData.success) {
      throw new CustomError('Invalid data', 400, parsedData.error.errors)
    }
  }
}
