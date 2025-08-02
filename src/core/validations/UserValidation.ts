import { object, string } from 'zod'

export const CreateUserSchema = object({
  name: string({ required_error: 'Name is required' }).min(2),
  email: string().email().optional(),
  rut: string()
    .regex(/^\d{7,8}-[0-9kK]$/, 'Invalid RUT format')
    .optional(),
  password: string().min(6, 'Password must be at least 6 characters long'),
  role: string().uuid().optional(),
})

export const UpdateUserSchema = object({
  name: string().min(2).optional(),
  email: string().email().optional(),
  rut: string()
    .regex(/^\d{7,8}-[0-9kK]$/, 'Invalid RUT format')
    .optional(),
  role: string().uuid().optional(),
})
