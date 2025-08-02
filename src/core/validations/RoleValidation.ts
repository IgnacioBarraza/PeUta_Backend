import { object, string } from 'zod'

export const RoleValidation = object({
  name: string({ required_error: 'Role name is required' }),
  description: string({ required_error: 'Role description is required' }),
  label: string({ required_error: 'Role label is required' }),
})

export const UpdateRoleSchema = object({
  name: string().optional(),
  description: string().optional(),
  label: string().optional(),
})
