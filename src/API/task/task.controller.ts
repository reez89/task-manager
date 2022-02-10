import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Task } from '../../entities/task.entity';

import { TaskCreateDto } from '../../models/task-create.dto';
import { TaskUpdateDto } from '../../models/task-update.dto';

import { HasPermission } from '../permission/permission-decorator';
import { UserService } from '../user/user.service';
import { Response, Request } from 'express';
import { TaskService } from './task.service';
import { User } from 'src/entities/user.entity';

@UseGuards( AuthGuard )
@Controller( 'task' )
export class TaskController {

    constructor(
        private taskService: TaskService,
        private auth: AuthService,
        private userService: UserService ) {}


    // IN QUESTO METODO, IMPEDISCO AD UTENTE CON RUOLO DIVERSO DA ADMIN, DI ACCEDERE A TUTTE LE TASKS
    @UseInterceptors( ClassSerializerInterceptor )
    @HasPermission( 'task' )
    @Get()
    async all(
        @Query( 'page' ) page: number = 1,
        @Query( 'pageSize' ) pageSize: number,
        @Req() request: Request ) {
        try {
            const id = await this.auth.userId( request );
            const user: User = await this.userService.find( { id }, [ 'task' ] );
            console.log( user );
            if ( user.role.name !== 'Admin' ) {
                return {
                    task: []
                };
            };
        } catch ( e ) {

            return { message: 'You are not an Admin, please contact your Project Manager' };
        }

        return this.taskService.paginate( page, [ 'user' ], pageSize );
    }

    // IN QUESTO METODO, OGNI UTENTE PUO' ACCEDERE ESCLUSIVAMENTE ALLE SUE TASKS
    @UseInterceptors( ClassSerializerInterceptor )
    @HasPermission( 'task' )
    @Get( 'user-tasks' )
    async userTask(
        @Query( 'page' ) page: number = 1,
        @Query( 'pageSize' ) pageSize: number,
        @Req() request: Request ) {
        const id = await this.auth.userId( request );
        const user = await this.userService.find( { id }, [ 'task' ] );

        return {
            task: user.task
        };
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
