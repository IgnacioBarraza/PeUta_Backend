import { array, object, string } from "zod";

export const RoleValidation = object({
  name: string({ required_error: 'Role name is required'}),
  permissions: array(string({
    required_error: 'Role permissions are required'
  }))
})