import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './Role'
import { Evaluations } from './Evaluations'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @Column({ unique: true, nullable: true })
  rut?: string

  @Column({ unique: true, nullable: true })
  email?: string

  @Column()
  password!: string

  @ManyToOne(() => Role)
  role!: Role

  @OneToMany(() => Evaluations, evaluations => evaluations.user, {
    nullable: true,
  })
  evaluations?: Evaluations[]
}
