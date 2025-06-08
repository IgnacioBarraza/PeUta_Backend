import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @Column({ unique: true })
  apiKey!: string

  @Column({ type: 'jsonb', nullable: true })
  config?: Record<string, any>

  @CreateDateColumn()
  createdAt!: Date
}