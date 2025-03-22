import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermissions } from "./RolePermissions";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  action!: string

  @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.permissions)
  rolePermissions!: RolePermissions[];
}