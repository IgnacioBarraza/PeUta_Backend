import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  roleName!: string

  @OneToMany(() => User, user => user.role)
  users!: User[]
}