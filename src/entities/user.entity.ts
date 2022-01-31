import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { Exclude } from "class-transformer";
import { Role } from "./role.entity";

@Entity( 'users' )
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany( () => Task, task => task.user )
    task: Task[];

    @ManyToOne( () => Role, role => role )
    @JoinColumn( { name: 'role_id' } )
    role: Role;
}