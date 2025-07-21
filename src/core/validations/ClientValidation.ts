import { string, array, date, object } from 'zod'
import { EventSchema } from './EventValidation'
import { ClientStaffSchema } from './ClientStaffValidation'

export const ClientSchema = object({
  id: string(),
  name: string(),
  api_key: string(),
  contact_email: string().email(),
  logo_url: string().url().optional(),
  staff: array(ClientStaffSchema),
  events: array(EventSchema),
  created_at: date(),
  updated_at: date(),
})

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
