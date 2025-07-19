import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Project } from "./Project";

@Entity()
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Project, (project) => project.members)
  @JoinColumn({ name: 'project_id' })
  project!: Project

  @Column()
  full_name!: string
}
