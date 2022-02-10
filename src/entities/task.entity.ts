import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @CreateDateColumn()
    created_at: string;

    @ManyToOne( () => Project, project => project.task )
    @JoinColumn( { name: 'project_id' } )
    project: Project;

    @ManyToOne( () => User, user => user.task )
    @JoinColumn(
        {
            name: 'user_id',
            referencedColumnName: 'id'
        },
    )
    user: User;
}

