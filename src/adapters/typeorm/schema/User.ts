import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Evaluations } from "./Evaluations";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @Column({ unique: true })
  rut!: string

  @Column()
  password!: string

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role!: Role

  @OneToMany(() => Evaluations, evaluations => evaluations.user)
  evaluations!: Evaluations[]
}