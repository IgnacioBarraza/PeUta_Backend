import { object, string, coerce } from 'zod'

export const CreateEventSchema = object({
  name: string().min(1).max(80),
  sub_title: string().max(200).optional(),
  description: string().min(1),
  date_start: coerce.date(),
  date_end: coerce.date(),
  location: string().min(1),
  banner_url: string().url(),
  client_id: string().uuid(),
})

export const UpdateEventSchema = object({
  name: string().min(1).max(80).optional(),
  sub_title: string().max(200).optional(),
  description: string().min(1).optional(),
  date_start: coerce.date().optional(),
  date_end: coerce.date().optional(),
  location: string().min(1).optional(),
  banner_url: string().url().optional(),
})
