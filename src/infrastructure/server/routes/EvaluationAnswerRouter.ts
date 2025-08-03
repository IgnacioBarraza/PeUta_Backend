import { Router } from 'express'
import { EvaluationAnswerController } from '../../controllers/EvaluationAnswerController'
import { EvaluationAnswerService } from '../../../core/services/EvaluationAnswerService'
import { EvaluationAnswerRepository } from '../../../core/ports/EvaluationAnswerRepository'
import { EvaluationAnswerRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/EvaluationAnswerRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'

const answerRepository: EvaluationAnswerRepository =
  new EvaluationAnswerRepositoryImpl(AppDataSource)
const answerService = new EvaluationAnswerService(answerRepository)
const answerController = new EvaluationAnswerController(answerService)

export const answerRouter = Router()

answerRouter.get('/', answerController.getAllAnswers)
answerRouter.get('/:id', answerController.getAnswerById)
answerRouter.post('/', answerController.createAnswer)
answerRouter.delete('/:id', answerController.deleteAnswer)
