import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Project } from 'src/project.entity';
import { ProjectService } from 'src/project/project.service';
import { Task } from 'src/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository( Task )
        private taskRepository: Repository<Task>,
    ) {}

    createTask( title: string, description: string, priority: string, state: string, project: number, user?: number ): Promise<Task> {
        const newTask = this.taskRepository.create( {
            title,
            description,
            priority,
            state,
            project,
            user
        } );
        if ( user === null )
            newTask.user = user;

        return this.taskRepository.save( newTask );
    }

    async getTaskByName( name: string ): Promise<Task> {

        const task = await this.taskRepository.createQueryBuilder()
            .where( 'task.title LIKE :name', { name } )
            .select( [
                "task.id",
                "task.title",
                "task.description",
                "task.priority",
                "task.state",
                "task.userId"
            ] )
            .execute();
        return task;
    }

    async updateTask(
        id: number, title?: string, state?: string, description?: string, project?: number, user?: number
    ): Promise<Task> {
        const task = await this.taskRepository.findOne( id );


        task.title = title;
        task.state = state;
        task.description = description;
        task.project = project;
        task.user = user;
        return await this.taskRepository.save( task );
    };


    async removeTask( name: string ): Promise<Task> {

        const task = await this.getTaskByName( name );

        return this.taskRepository.remove( task );
    }


}
