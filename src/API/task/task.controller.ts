import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Put, Query, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { Task } from '../../entities/task.entity';

import { TaskCreateDto } from '../../models/task-create.dto';
import { TaskUpdateDto } from '../../models/task-update.dto';

import { HasPermission } from '../permission/permission-decorator';

import { TaskService } from './task.service';

@UseGuards( AuthGuard )
@Controller( 'task' )
export class TaskController {

    constructor( private taskService: TaskService ) {}

    @UseInterceptors( ClassSerializerInterceptor )
    @Get()
    async all( @Query( 'page' ) page: number = 1 ) {

        return this.taskService.paginate( page, [ 'user' ] );
    }
    @HasPermission( 'task' )
    @Post()
    async createTask( @Body() body: TaskCreateDto, ): Promise<Task> {
        const { project_id, user_id, ...data } = body;
        return this.taskService.create( {
            ...data,
            project: { id: project_id },
            user: { id: user_id }
        } );
    }
    @HasPermission( 'task' )
    @Get( ':id' )
    async get( @Param( 'id' ) id: number ) {
        return this.taskService.find( { id } );
    }

    @HasPermission( 'task' )
    @Put( ':id' )
    async updateTask(
        @Param( 'id' ) id: number,
        @Body() body: TaskUpdateDto
    ) {
        const { project_id, user_id, ...data } = body;

        await this.taskService.update( id, {
            ...data,
            project: { id: project_id },
            user: { id: user_id }
        } );

        return this.taskService.find( { id } );
    }
    @HasPermission( 'task' )
    @Delete( ':id' )
    async delete( @Param( 'id' ) id: number ) {
        return this.taskService.delete( id );
    }


}
