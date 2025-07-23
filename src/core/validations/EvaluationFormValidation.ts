import { object, string } from 'zod'

export const CreateEvaluationFormSchema = object({
  name: string().min(1, 'Name is required'),
  description: string().min(1, 'Description is required'),
  event_id: string().uuid('Invalid event ID'),
})

export const UpdateEvaluationFormSchema = object({
  name: string().min(1).optional(),
  description: string().min(1).optional(),
})
