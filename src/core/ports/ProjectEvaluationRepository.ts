import { ProjectEvaluationEntity } from '../entities/ProjectEvaluationEntity'

export interface ProjectEvaluationRepository {
  getAllEvaluations(api_key: string): Promise<ProjectEvaluationEntity[]>
  getEvaluationById(
    api_key: string,
    id: string
  ): Promise<ProjectEvaluationEntity | null>
  getEvaluationsByProject(
    api_key: string,
    project_id: string
  ): Promise<ProjectEvaluationEntity[]>
  createEvaluation(
    evaluation: Partial<ProjectEvaluationEntity>
  ): Promise<ProjectEvaluationEntity | null>
  deleteEvaluation(api_key: string, id: string): Promise<boolean>
  hasUserEvaluatedProject(
    api_key: string,
    user_id: string,
    project_id: string
  ): Promise<boolean>
  getEvaluatedProjectsByUser(
    api_key: string,
    user_id: string,
    event_id: string
  ): Promise<ProjectEvaluationEntity[]>
  updateEvaluationFinalScore(
    api_key: string,
    id: string,
    final_score: number
  ): Promise<ProjectEvaluationEntity | null>
}
