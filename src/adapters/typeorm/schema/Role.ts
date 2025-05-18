import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @OneToMany(() => User, user => user.role)
  users!: User[]

  @Column({ type: 'jsonb', nullable: false, default: '[]' })
  permissions!: string[]
}
