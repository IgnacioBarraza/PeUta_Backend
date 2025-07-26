import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from './Role'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Index()
  @Column({ nullable: true, unique: true })
  email?: string

  @Index()
  @Column({ nullable: true, unique: true })
  rut?: string

  @Column({ select: false })
  password!: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date

  @ManyToOne(() => Role, role => role.user)
  role?: Role
}
