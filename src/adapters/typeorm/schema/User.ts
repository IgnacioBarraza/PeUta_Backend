import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @Column()
  rut!: string

  @Column()
  password!: string

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role!: Role
}