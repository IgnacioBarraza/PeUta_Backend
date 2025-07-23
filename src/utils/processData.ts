/**
 * Calcula la suma total de los pesos (`weigth`) de una lista de preguntas.
 *
 * @param weights Arreglo de pesos individuales (valores entre 0 y 1)
 * @returns Suma total de los pesos
 */
export function getTotalWeightForForm(weights: number[]): number {
  return weights.reduce((sum, w) => sum + w, 0)
}
