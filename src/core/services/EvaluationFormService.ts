import { CustomError } from '../../infrastructure/middlewares/errorHandler'
import { EvaluationFormEntity } from '../entities/EvaluationFormEntity'
import { EvaluationFormRepository } from '../ports/EvaluationFormRepository'
import { EventRepository } from '../ports/EventRepository'
import {
  CreateEvaluationFormSchema,
  UpdateEvaluationFormSchema,
} from '../validations/EvaluationFormValidation'

export class EvaluationFormService {
  constructor(
    private formRepository: EvaluationFormRepository,
    private eventRepository: EventRepository
  ) {}

  async getAllForms(api_key: string): Promise<EvaluationFormEntity[]> {
    const forms = await this.formRepository.getAllEvaluationForm(api_key)
    if (forms.length === 0)
      throw new CustomError('No forms found', 404, ['No forms found'])
    return forms
  }

  async getFormById(
    api_key: string,
    id: string
  ): Promise<EvaluationFormEntity> {
    const form = await this.formRepository.getEvaluationFormById(api_key, id)
    if (!form) throw new CustomError('Form not found', 404, ['Form not found'])
    return form
  }

  async getFormsByEvent(
    api_key: string,
    eventId: string
  ): Promise<EvaluationFormEntity[]> {
    const forms = await this.formRepository.getEvaluationFormByEvent(
      api_key,
      eventId
    )
    if (forms.length === 0)
      throw new CustomError('No forms found', 404, ['No forms found'])
    return forms
  }

  async createForm(
    api_key: string,
    form: EvaluationFormEntity
  ): Promise<EvaluationFormEntity> {
    const parsedData = CreateEvaluationFormSchema.strict().safeParse(form)
    if (!parsedData.success)
      throw new CustomError('Validation error', 400, parsedData.error)

    const data = parsedData.data

    const event = await this.eventRepository.getEventByIdAndApikey(
      data.event_id,
      api_key
    )
    if (!event)
      throw new CustomError('Event not found', 404, ['Event not found'])

    const newForm = await this.formRepository.createEvaluationForm({
      ...data,
      event: event,
    })

    if (!newForm)
      throw new CustomError('Form not created', 500, ['Form not created'])

    return newForm
  }

  async updateForm(
    api_key: string,
    id: string,
    form: EvaluationFormEntity
  ): Promise<EvaluationFormEntity> {
    const parsedData = UpdateEvaluationFormSchema.strict().safeParse(form)
    if (!parsedData.success)
      throw new CustomError('Validation error', 400, parsedData.error.errors)

    const data = parsedData.data
    const updated = await this.formRepository.updateEvaluationForm(
      api_key,
      id,
      data
    )
    if (!updated)
      throw new CustomError('Form not updated', 500, ['Form not updated'])
    return updated
  }

  async deleteForm(api_key: string, id: string): Promise<boolean> {
    const deleted = await this.formRepository.deleteEvaluationForm(api_key, id)
    if (!deleted)
      throw new CustomError('Form not deleted', 500, ['Form not deleted'])
    return deleted
  }
}
