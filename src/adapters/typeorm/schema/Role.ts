import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { RolePermissions } from "./RolePermissions";

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  roleName!: string

  @OneToMany(() => User, user => user.role)
  users!: User[]

  @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.role)
  rolePermissions!: RolePermissions[];
}