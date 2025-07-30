import { Router } from 'express'
import { ExportEventController } from '../../controllers/ExportEventController'
import { EventExportService } from '../../../core/services/EventExportService'
import { ExportEventRepository } from '../../../core/ports/ExportEventRepository'
import { ExportEventRepositoryImpl } from '../../../adapters/typeorm/repositoryImpl/ExportEventRepositoryImpl'
import { AppDataSource } from '../../orm/data-source'

const exportRepository: ExportEventRepository = new ExportEventRepositoryImpl(
  AppDataSource
)

const exportService = new EventExportService(exportRepository)
const exportController = new ExportEventController(exportService)

export const exportRouter = Router()

exportRouter.get('/excel/:eventId', exportController.exportExcel)
