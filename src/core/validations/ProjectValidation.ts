import { object, string } from 'zod'

export const CreateProjectSchema = object({
  title: string().min(1),
  description: string().min(1),
  image_url: string().url(),
  category_id: string().uuid(),
  event_id: string().uuid(),
})

export const UpdateProjectSchema = object({
  title: string().min(1).optional(),
  description: string().min(1).optional(),
  image_url: string().url().optional(),
  category_id: string().uuid().optional(),
  event_id: string().uuid().optional(),
})
