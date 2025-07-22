import { object, string, date, array, optional, coerce } from 'zod'

export const EventSchema = object({
  id: string(),
  name: string(),
  sub_title: string().optional(),
  description: string(),
  date_start: coerce.date(),
  date_end: coerce.date(),
  location: string(),
  banner_url: string(),
  client_id: string(),
  created_at: date(),
  updated_at: date(),

  // Relaciones opcionales (puedes definir esquemas separados si los necesitas validados)
  projects: optional(array(object({ id: string() }))), // placeholder
  categories: optional(array(object({ id: string() }))),
  forms: optional(array(object({ id: string() }))),
  reviewers: optional(array(object({ id: string() }))),
  attendance_sessions: optional(array(object({ id: string() }))),
})

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
