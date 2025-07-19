import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ClientStaff } from './ClientStaff'

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  name!: string

  @Index()
  @Column({ unique: true })
  api_key!: string

  @Column({ nullable: false })
  contact_email!: string

  @Column({ nullable: true })
  logo_url?: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date

  @OneToMany(() => ClientStaff, staff => staff.client)
  staff!: ClientStaff[]

  // @OneToMany(() => Events, event => event.client)
  // events: Events[]
}
