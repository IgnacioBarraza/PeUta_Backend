import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  action!: string

  @ManyToMany(() => Role)
  @JoinTable()
  rolePermissions!: Role[]
}