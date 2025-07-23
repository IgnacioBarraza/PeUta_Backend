import { object, string, number } from 'zod'

export const CreateEvaluationQuestionSchema = object({
  question: string().min(1, 'Question is required'),
  weight: number().nonnegative('Weight must be 0 or more'),
  order: number().int().nonnegative('Order must be 0 or more'),
  form_id: string().uuid('Invalid form ID'),
})

export const UpdateEvaluationQuestionSchema = object({
  question: string().min(1).optional(),
  weigth: number().nonnegative().optional(),
  order: number().int().nonnegative().optional(),
})
