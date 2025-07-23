import { EvaluationFormEntity } from '../entities/EvaluationFormEntity'

export interface EvaluationFormRepository {
  getAllEvaluationForm(api_key: string): Promise<EvaluationFormEntity[]>
  getEvaluationFormById(
    api_key: string,
    id: string
  ): Promise<EvaluationFormEntity | null>
  getEvaluationFormByEvent(
    api_key: string,
    eventId: string
  ): Promise<EvaluationFormEntity[]>
  createEvaluationForm(
    evaluationForm: Partial<EvaluationFormEntity>
  ): Promise<EvaluationFormEntity | null>
  updateEvaluationForm(
    api_key: string,
    id: string,
    evaluationForm: Partial<EvaluationFormEntity>
  ): Promise<EvaluationFormEntity | null>
  deleteEvaluationForm(api_key: string, id: string): Promise<boolean>
}
