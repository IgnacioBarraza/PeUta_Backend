import { NextFunction, Request, Response } from 'express'
import { EventExportService } from '../../core/services/EventExportService'
import { sanitizeError, sendResponse } from '../../utils/utils'
import { CustomError } from '../middlewares/errorHandler'

export class ExportEventController {
  private exportService: EventExportService

  constructor(exportService: EventExportService) {
    this.exportService = exportService
  }

  public exportExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { eventId } = req.params
    try {
      const { from, to } = req.query

      const buffer = await this.exportService.exportEventAsExcel(
        eventId,
        typeof from === 'string' ? from : undefined,
        typeof to === 'string' ? to : undefined
      )

      res.setHeader(
        'Content-Disposition',
        `attachment; filename="event_export_${eventId}.xlsx"`
      )
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )

      sendResponse(req, res, buffer, 200)
    } catch (error) {
      const { message, errors } = sanitizeError(error)
      next(
        new CustomError(
          message,
          (error as CustomError).statusCode || 500,
          errors
        )
      )
    }
  }
}
