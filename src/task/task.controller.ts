import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { TaskCreateDto } from 'src/user/models/task-create.dto';
import { TaskUpdateDto } from 'src/user/models/task-update.dto';
import { AuthGuard } from '../auth/auth.guard';
import { TaskService } from './task.service';

@UseGuards( AuthGuard )
@Controller( 'task' )
export class TaskController {

    constructor( private taskService: TaskService ) {}


    @Get()
    async all( @Query( 'page' ) page: number = 1 ) {
        return this.taskService.paginate( page );
    }

    @Post()
    async createTask( @Body() body: TaskCreateDto ) {
        return this.taskService.create( body );
    }

    @Get( ':id' )
    async get( @Param( 'id' ) id: number ) {
        return this.taskService.find( { id } );
    }

    @Put( ':id' )
    async updateTask( @Param( 'id' ) id: number, @Body() body: TaskUpdateDto ) {
        await this.taskService.update( id, body );

        return this.taskService.find( { id } );
    }

    @Delete( ':id' )
    async delete( @Param( 'id' ) id: number ) {
        return this.taskService.delete( id );
    }


}
