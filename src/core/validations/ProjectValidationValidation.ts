import { object, string, number, array } from 'zod'
import { CreateEvaluationAnswerSchema } from './EvaluationAnswerValidation'

export const CreateProjectEvaluationSchema = object({
  project_id: string().uuid('Invalid project ID'),
  form_id: string().uuid('Invalid form ID'),
  final_score: number(),
  comment: string().optional(),
  answers: array(CreateEvaluationAnswerSchema),
})
