import { CategoryEntity } from '../entities/CategoryEntity'

export interface CategoryRepository {
  getAllCategories(api_key: string): Promise<CategoryEntity[]>
  getCategoryById(api_key: string, id: string): Promise<CategoryEntity | null>
  getCategoriesByEvent(
    api_key: string,
    eventId: string
  ): Promise<CategoryEntity[]>
  createCategory(
    api_key: string,
    category: Partial<CategoryEntity>
  ): Promise<CategoryEntity>
  updateCategory(
    api_key: string,
    id: string,
    category: Partial<CategoryEntity>
  ): Promise<CategoryEntity | null>
  deleteCategory(api_key: string, id: string): Promise<boolean>
}
