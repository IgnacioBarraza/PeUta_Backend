import { object, string } from 'zod'

export const CreateMemberSchema = object({
  project_id: string().uuid({ message: 'Invalid project ID' }).optional(),
  full_name: string().min(1, { message: 'Full name is required' }),
})

export const UpdateMemberSchema = object({
  full_name: string().min(1, { message: 'Full name is required' }).optional(),
})

export const AddMemberSchema = object({
  full_name: string().min(1, { message: 'Full name is required' }),
})
