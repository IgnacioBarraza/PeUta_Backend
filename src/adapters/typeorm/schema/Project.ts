import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectMembers } from "./ProjectMembers";
import { Evaluations } from "./Evaluations";

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  projectName!: string

  @Column()
  description!: string

  @Column()
  category!: string

  @Column()
  imageUrl!: string

  @Column({ type: 'float', default: 0 })
  averageScore!: number

  @OneToMany(() => ProjectMembers, (members) => members.project)
  members!: ProjectMembers[]

  @OneToMany(() => Evaluations, evaluations => evaluations.project)
  evaluations!: Evaluations[]
}