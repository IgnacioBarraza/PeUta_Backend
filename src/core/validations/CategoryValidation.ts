import { object, string } from 'zod'

export const CreateCategorySchema = object({
  name: string().min(3).max(100),
  description: string().min(5).max(500),
  event_id: string().uuid(),
})

export const UpdateCategorySchema = object({
  name: string().min(3).max(100).optional(),
  description: string().min(5).max(500).optional(),
  event_id: string().uuid().optional(),
})
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update.',
  })
