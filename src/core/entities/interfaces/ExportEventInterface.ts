export interface ExportCategoryData {
  name: string
  questions: string[]
  projects: {
    name: string
    questionAverages: number[]
    finalAverage: number
  }[]
}

export interface ExportMetrics {
  users: number
  evaluations: number
  eventAverage: number
  categoryAverages: {
    name: string
    average: number
  }[]
}
