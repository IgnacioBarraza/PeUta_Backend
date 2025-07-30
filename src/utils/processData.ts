import { ProjectEvaluation } from '../adapters/typeorm/schema/ProjectEvaluation'
import { ExportCategoryData } from '../core/entities/interfaces/ExportEventInterface'

/**
 * Calcula la suma total de los pesos (`weigth`) de una lista de preguntas.
 *
 * @param weights Arreglo de pesos individuales (valores entre 0 y 1)
 * @returns Suma total de los pesos
 */
export function getTotalWeightForForm(weights: number[]): number {
  return weights.reduce((sum, w) => sum + w, 0)
}

export function groupByCategoryAndProject(
  evaluations: ProjectEvaluation[]
): ExportCategoryData[] {
  const categoryMap = new Map<string, ExportCategoryData>()

  for (const evaluation of evaluations) {
    if (!evaluation.project || !evaluation.project.category) continue

    const categoryName = evaluation.project.category.name
    const projectName = evaluation.project.title

    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, {
        name: categoryName,
        questions: [],
        projects: [],
      })
    }

    const category = categoryMap.get(categoryName)!
    const existingProject = category.projects.find(p => p.name === projectName)

    if (!existingProject) {
      const questionMap = new Map<string, number[]>()

      for (const answer of evaluation.answers || []) {
        const questionText = answer.question.question
        if (!category.questions.includes(questionText)) {
          category.questions.push(questionText)
        }

        if (!questionMap.has(questionText)) {
          questionMap.set(questionText, [])
        }

        questionMap.get(questionText)!.push(answer.score)
      }

      const questionAverages = category.questions.map((q: string) => {
        const scores = questionMap.get(q) || []
        const avg =
          scores.reduce((sum, val) => sum + val, 0) / (scores.length || 1)
        return parseFloat(avg.toFixed(2))
      })

      category.projects.push({
        name: projectName,
        questionAverages,
        finalAverage: parseFloat(evaluation.final_score.toFixed(2)),
      })
    } else {
      for (const answer of evaluation.answers || []) {
        const index = category.questions.indexOf(answer.question.question)
        if (index >= 0) {
          existingProject.questionAverages[index] =
            (existingProject.questionAverages[index] + answer.score) / 2
        }
      }

      existingProject.finalAverage =
        (existingProject.finalAverage + evaluation.final_score) / 2
    }
  }

  return Array.from(categoryMap.values())
}
