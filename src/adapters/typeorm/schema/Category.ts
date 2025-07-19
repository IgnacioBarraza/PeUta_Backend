import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Project } from "./Project"
import { Event } from "./Event"

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @ManyToOne(() => Event, event => event.categories)
  @JoinColumn({ name: 'event_id' })
  event!: Event

  @ManyToOne(() => Project, project => project.categories)
  projects!: Project[]
}