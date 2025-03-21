import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";

@Entity()
export class ProjectMembers {
  @PrimaryGeneratedColumn('uuid')
  uid!: string

  @Column()
  name!: string

  @ManyToOne(() => Project, (project) => project.members, { onDelete: 'CASCADE' })
  project!: Project
}