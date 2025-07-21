import { randomBytes } from 'crypto'

export function generateApiKey(length = 20): string {
  return randomBytes(length).toString('hex')
}
