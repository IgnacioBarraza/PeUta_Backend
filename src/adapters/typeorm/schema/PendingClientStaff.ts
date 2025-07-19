import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm'
import { Client } from './Client'
import { Role } from './Role'

@Entity()
@Index(['email', 'client'])
export class PendingClientStaff {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  email!: string

  @ManyToOne(() => Client)
  client!: Client

  @ManyToOne(() => Role)
  role!: Role

  @Column({ nullable: true })
  position!: string

  @Column({ unique: true })
  invite_token!: string

  @Column({ default: 'pending' })
  status!: 'pending' | 'accepted' | 'expired' | 'revoked'

  @Column({ type: 'timestamptz' })
  expires_at!: Date

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date
}
