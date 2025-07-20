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
import { Event } from './Event'
import { PendingClientStaff } from './PendingClientStaff'

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

  @OneToMany(() => ClientStaff, staff => staff.client)
  staff!: ClientStaff[]

  @OneToMany(() => Event, event => event.client)
  events!: Event[]

  @OneToMany(() => PendingClientStaff, p => p.client)
  pending_staff!: PendingClientStaff[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
