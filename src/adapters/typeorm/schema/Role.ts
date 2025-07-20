import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { ClientStaff } from './ClientStaff'
import { PendingClientStaff } from './PendingClientStaff'
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
  user?: User[]

  @OneToMany(() => ClientStaff, staff => staff.role)
  staffMembers?: ClientStaff[]

  @OneToMany(() => PendingClientStaff, p => p.client)
  pending_staff?: PendingClientStaff[]
}
