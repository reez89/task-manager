import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { TaskInterface } from "./task.interface";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    priority: string;

    @Column()
    state: string;

    @ManyToOne( () => Project, project => project.id )
    project: number;


}