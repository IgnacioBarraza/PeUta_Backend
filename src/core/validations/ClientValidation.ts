import { string, object } from 'zod'

export const ClientCreateSchema = object({
  name: string(),
  contact_email: string().email(),
  logo_url: string().url().optional(),
})

export const ClientUpdateSchema = object({
  name: string().min(3).max(100).optional(),
  contact_email: string().email().optional(),
  logo_url: string().url().optional(),
})
