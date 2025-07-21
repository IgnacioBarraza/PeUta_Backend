import { object, string, date } from 'zod'

export const EventSchema = object({
  id: string(),
  client_id: string(),
  name: string(),
  date: date(),
  location: string(),
  created_at: date(),
  updated_at: date(),
})
