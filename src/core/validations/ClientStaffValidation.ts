import { object, string, date } from 'zod'

export const ClientStaffSchema = object({
  id: string(),
  client_id: string(),
  user_id: string(),
  role: string(),
  created_at: date(),
  updated_at: date(),
})
