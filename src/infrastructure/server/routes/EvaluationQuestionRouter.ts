import { Router } from 'express'
import { EvaluationQuestionController } from '../../controllers/EvaluationQuestionController'
import { EvaluationQuestionService } from '../../../core/services/EvaluationQuestionService'
import { EvaluationQuestionRepository } from '../../../core/ports/EvaluationQuestionRepository'
import { EvaluationFormRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EvaluationFormRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'
import { EvaluationQuestionRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EvaluationQuestionRepositoryImpl'
import { EvaluationFormRepository } from '../../../core/ports/EvaluationFormRepository'
import { validateApiKEy } from '../../middlewares/validateApiKey'

const questionRepository: EvaluationQuestionRepository =
  new EvaluationQuestionRepositoryImpl(AppDataSource)
const formRepository: EvaluationFormRepository =
  new EvaluationFormRepositoryImpl(AppDataSource)
const questionService = new EvaluationQuestionService(
  questionRepository,
  formRepository
)
const questionController = new EvaluationQuestionController(questionService)

export const questionRouter = Router()

questionRouter.use(validateApiKEy)

questionRouter.get('/', questionController.getAllQuestions)
questionRouter.get('/:id', questionController.getQuestionById)
questionRouter.post('/', questionController.createQuestion)
questionRouter.patch('/:id', questionController.updateQuestion)
questionRouter.delete('/:id', questionController.deleteQuestion)
