import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @Column({ type: 'jsonb', nullable: false, default: '[]' })
  permissions!: string[]
}
