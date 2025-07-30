import ExcelJS from 'exceljs'
import {
  ExportCategoryData,
  ExportMetrics,
} from '../core/entities/interfaces/ExportEventInterface'

export class ExcelBuilder {
  static async buildWorkbook(
    categories: ExportCategoryData[],
    metrics: ExportMetrics
  ): Promise<any> {
    const workbook = new ExcelJS.Workbook()

    for (const category of categories) {
      const sheet = workbook.addWorksheet(category.name)
      sheet.addRow(['Proyecto', ...category.questions, 'Promedio Final'])

      for (const project of category.projects) {
        sheet.addRow([
          project.name,
          ...project.questionAverages.map(avg => avg.toFixed(2)),
          project.finalAverage.toFixed(2),
        ])
      }
    }

    const metricsSheet = workbook.addWorksheet('Métricas')
    metricsSheet.addRow(['Métrica', 'Valor'])
    metricsSheet.addRow(['Usuarios registrados', metrics.users])
    metricsSheet.addRow(['Evaluaciones hechas', metrics.evaluations])
    metricsSheet.addRow([
      'Promedio general expo',
      metrics.eventAverage.toFixed(2),
    ])

    for (const cat of metrics.categoryAverages) {
      metricsSheet.addRow([
        `Promedio categoría: ${cat.name}`,
        cat.average.toFixed(2),
      ])
    }

    return await workbook.xlsx.writeBuffer()
  }
}
