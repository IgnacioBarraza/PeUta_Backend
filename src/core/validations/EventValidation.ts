import { object, string, coerce, enum as enum_, nativeEnum } from 'zod'
import { EventStatus } from '../../adapters/typeorm/schema/Event'

export const CreateEventSchema = object({
  name: string().min(1).max(80),
  sub_title: string().max(200).optional(),
  description: string().min(1),
  date_start: coerce.date(),
  date_end: coerce.date(),
  location: string().min(1),
  banner_url: string().url(),
  client_id: string().uuid(),
  registration_method: enum_(['email', 'rut', 'both']).default('email'),
  allow_public_evaluation: coerce.boolean().default(false),
  status: nativeEnum(EventStatus).default(EventStatus.Pending),
})

export const UpdateEventSchema = object({
  name: string().min(1).max(80).optional(),
  sub_title: string().max(200).optional(),
  description: string().min(1).optional(),
  date_start: coerce.date().optional(),
  date_end: coerce.date().optional(),
  location: string().min(1).optional(),
  banner_url: string().url().optional(),
  registration_method: enum_(['email', 'rut', 'both']).optional(),
  allow_public_evaluation: coerce.boolean().optional(),
  status: nativeEnum(EventStatus).optional(),
})
