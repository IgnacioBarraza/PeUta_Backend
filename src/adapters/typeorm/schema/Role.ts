import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { ClientStaff } from './ClientStaff'
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  label!: string

  @Column('text')
  description!: string

  @OneToMany(() => User, user => user.role)
  user!: User[]

  @OneToMany(() => ClientStaff, staff => staff.role)
  staffMembers!: ClientStaff[]
}
