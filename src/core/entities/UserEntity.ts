import { EvaluationEntity } from './EvaluationEntity'
import { RoleEntity } from './RoleEntity'

export class UserEntity {
  uid: string
  name: string
  rut?: string
  email?: string
  password: string
  role: RoleEntity
  evaluations?: EvaluationEntity[]

  constructor(data: UserEntity) {
    this.uid = data.uid
    this.name = data.name
    this.rut = data.rut
    this.email = data.email
    this.password = data.password
    this.role = data.role
    this.evaluations = data.evaluations
  }
}
