import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { ProjectEvaluationEntity } from '../entities/ProjectEvaluationEntity'
import { EvaluationAnswerRepository } from '../ports/EvaluationAnswerRepository'
import { EvaluationFormRepository } from '../ports/EvaluationFormRepository'
import { EvaluationQuestionRepository } from '../ports/EvaluationQuestionRepository'
import { ProjectEvaluationRepository } from '../ports/ProjectEvaluationRepository'
import { ProjectRepository } from '../ports/ProjectRepository'
import { UserRepository } from '../ports/UserRepository'
import { CreateProjectEvaluationSchema } from '../validations/ProjectValidationValidation'

export class ProjectEvaluationService {
  constructor(
    private evaluationRepository: ProjectEvaluationRepository,
    private answerRepository: EvaluationAnswerRepository,
    private userRepository: UserRepository,
    private questionRepository: EvaluationQuestionRepository,
    private projectRepository: ProjectRepository,
    private formRepository: EvaluationFormRepository
  ) {}

  async getAllEvaluations(api_key: string): Promise<ProjectEvaluationEntity[]> {
    const evaluations =
      await this.evaluationRepository.getAllEvaluations(api_key)

    if (evaluations.length === 0)
      throw new CustomError('Evaluations not found', 404, [
        'Evaluations not found',
      ])
    return evaluations
  }

  async getEvaluationById(
    api_key: string,
    id: string
  ): Promise<ProjectEvaluationEntity> {
    const evaluation = await this.evaluationRepository.getEvaluationById(
      api_key,
      id
    )
    if (!evaluation)
      throw new CustomError('Evaluation not found', 404, [
        'Evaluation not found',
      ])
    return evaluation
  }

  async getEvaluationsByProject(
    api_key: string,
    projectId: string
  ): Promise<ProjectEvaluationEntity[]> {
    const evaluations = await this.evaluationRepository.getEvaluationsByProject(
      api_key,
      projectId
    )

    if (evaluations.length === 0)
      throw new CustomError('Evaluations not found', 404, [
        'Evaluations not found',
      ])

    return evaluations
  }

  async getEvaluatedProjectByUser(
    api_key: string,
    user_id: string,
    event_id: string
  ): Promise<ProjectEvaluationEntity[]> {
    const evaluations =
      await this.evaluationRepository.getEvaluatedProjectsByUser(
        api_key,
        user_id,
        event_id
      )

    if (evaluations.length === 0)
      throw new CustomError('Evaluations not found', 404, [
        'Evaluations not found',
      ])

    return evaluations
  }

  async hasUserEvaluatedProject(
    api_key: string,
    user_id: string,
    project_id: string
  ): Promise<boolean> {
    const evaluation = await this.evaluationRepository.hasUserEvaluatedProject(
      api_key,
      user_id,
      project_id
    )

    if (!evaluation)
      throw new CustomError('User already evaluated this project', 403, [
        'Proyecto ya evaluado por usuario',
      ])

    return evaluation
  }

  async createEvaluation(
    api_key: string,
    user_id: string,
    evaluation: ProjectEvaluationEntity
  ): Promise<ProjectEvaluationEntity> {
    const parsedData =
      CreateProjectEvaluationSchema.strict().safeParse(evaluation)
    if (!parsedData.success)
      throw new CustomError('Invalid data', 400, parsedData.error)

    const data = parsedData.data

    const user = await this.userRepository.getUserById(user_id)
    if (!user) throw new Error('Invalid user')

    const project = await this.projectRepository.getProjectById(
      data.project_id,
      api_key
    )
    if (!project)
      throw new CustomError('Project not found', 404, ['Project not found'])

    const form = await this.formRepository.getEvaluationFormById(
      api_key,
      data.form_id
    )
    if (!form) throw new CustomError('Form not found', 404, ['Form not found'])

    const baseEvaluation = await this.evaluationRepository.createEvaluation({
      ...evaluation,
      form: form,
      project: project,
      evaluator: user,
      final_score: data.final_score,
      answers: [],
      comment: data.comment,
    })

    if (!baseEvaluation)
      throw new CustomError('Evaluation not created', 500, [
        'Evaluation not created',
      ])

    for (const ans of data.answers) {
      const question = await this.questionRepository.getQuestionById(
        api_key,
        ans.question_id
      )
      if (!question) throw new Error(`Question not found: ${ans.question_id}`)

      await this.answerRepository.createAnswer({
        score: ans.score,
        evaluation: baseEvaluation,
        question,
      })
    }

    return baseEvaluation
  }

  async deleteEvaluation(api_key: string, id: string): Promise<boolean> {
    const deleted = await this.evaluationRepository.deleteEvaluation(
      api_key,
      id
    )
    if (!deleted)
      throw new CustomError('Evaluation not deleted', 500, [
        'Evaluation not deleted',
      ])
    return deleted
  }
}
