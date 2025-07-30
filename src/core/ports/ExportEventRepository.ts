import {
  ExportCategoryData,
  ExportMetrics,
} from '../entities/interfaces/ExportEventInterface'

export interface ExportEventRepository {
  getEvaluationExportData(
    eventId: string,
    from?: string,
    to?: string
  ): Promise<ExportCategoryData[]>

  getMetricsForExport(
    eventId: string,
    from?: string,
    to?: string
  ): Promise<ExportMetrics>
}
