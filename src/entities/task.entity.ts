import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity( 'tasks' )
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

    @ManyToOne( () => User, user => user.id )
    user: number;

}   