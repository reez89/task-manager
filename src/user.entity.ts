import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { Exclude } from "class-transformer";

@Entity()
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
}