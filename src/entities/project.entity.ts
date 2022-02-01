import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";
import { Task } from "./task.entity";


@Entity( 'projects' )
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectName: string;

    @Column()
    clientName: string;

    @Column()
    expectedDelivery: string;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: string;

    @ManyToOne( () => Client, client => client.id )
    client: number;

    @OneToMany( () => Task, task => task.project )
    task: Task[];
}