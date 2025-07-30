import { ExcelBuilder } from '../../utils/excelBuilder'
import { EventRepository } from '../ports/EventRepository'
import { ExportEventRepository } from '../ports/ExportEventRepository'

export class EventExportService {
  constructor(private readonly exportRepository: ExportEventRepository) {}

  async exportEventAsExcel(
    eventId: string,
    from?: string,
    to?: string
  ): Promise<Buffer> {
    const [evaluations, metrics] = await Promise.all([
      this.exportRepository.getEvaluationExportData(eventId, from, to),
      this.exportRepository.getMetricsForExport(eventId, from, to),
    ])

    return await ExcelBuilder.buildWorkbook(evaluations, metrics)
  }
}
