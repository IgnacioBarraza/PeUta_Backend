import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Permission } from "./Permissions";

@Entity()
export class RolePermissions {
  @PrimaryGeneratedColumn("uuid")
  uid!: string;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  @JoinColumn({ name: "roleId" })
  role!: Role;

  @ManyToOne(() => Permission, (permissions) => permissions.rolePermissions)
  @JoinColumn({ name: "permissionId" })
  permissions!: Permission;
}