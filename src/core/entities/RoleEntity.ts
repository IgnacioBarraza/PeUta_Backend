export class RoleEntity {
  id: string
  name: string
  description: string
  label: string

  constructor(data: RoleEntity) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.label = data.label
  }
}
