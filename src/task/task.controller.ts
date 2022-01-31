import { Controller, Get, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';

@Controller( 'task' )
export class TaskController {

    constructor( private taskService: TaskService ) {}

    @UseGuards( AuthGuard( 'local' ) )
    @Post()
    async createTask() {
        return this.taskService.createTask(
            'prova task 6',
            'questo e un test di prova numero 6',
            'medium',
            'onHold',
            2,
            3
        );
    }

    @UseGuards( AuthGuard( 'local' ) )
    @Patch()
    async updateTask() {
        return await this.taskService.updateTask(
            1, 'CAMBIATO', 'GOING', 'CAMBIATO', 1, 3 );
    }

    @UseGuards( AuthGuard( 'local' ) )
    @Get()
    getTask() {
        return this.taskService.getTaskByName( 'prova task 5' );
    }

}
