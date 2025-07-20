const invalidPatterns = [
  '00000000',
  '11111111',
  '22222222',
  '33333333',
  '44444444',
  '55555555',
  '66666666',
  '77777777',
  '88888888',
  '99999999',
]

export function validateRut(rut: string): boolean {
  if (!rut) return false

  // Elimina puntos y guiones, y transforma a mayúsculas
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase()

  // RUT debe tener al menos 2 caracteres (1 para cuerpo, 1 para DV)
  if (cleanRut.length < 2) return false

  const rutBase = cleanRut.slice(0, -1)
  const verificationDigit = cleanRut.slice(-1)

  // Verifica que el cuerpo sea solo números
  if (!/^\d+$/.test(rutBase)) return false

  if (invalidPatterns.includes(rutBase)) return false

  let sum = 0
  let multiplier = 2

  for (let i = rutBase.length - 1; i >= 0; i--) {
    sum += parseInt(rutBase.charAt(i), 10) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const mod11 = 11 - (sum % 11)
  let expectedDV = ''

  if (mod11 === 11) expectedDV = '0'
  else if (mod11 === 10) expectedDV = 'K'
  else expectedDV = mod11.toString()

  return expectedDV === verificationDigit
}

export function normalizeRut(rutConDV: string): string {
  const rut = rutConDV.replace(/\./g, '').replace(/-/g, '').toUpperCase()
  const cuerpo = rut.slice(0, -1)
  const dv = rut.slice(-1)
  return `${cuerpo}-${dv}`
}
