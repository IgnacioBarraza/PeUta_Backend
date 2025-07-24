import { object, string, number } from 'zod'

export const CreateEvaluationAnswerSchema = object({
  question_id: string().uuid('Invalid question ID'),
  score: number(),
})
