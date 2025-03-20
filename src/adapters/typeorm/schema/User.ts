import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @Column()
  rut!: string
}