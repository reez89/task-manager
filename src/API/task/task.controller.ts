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
import { TaskAdminUpdateDto } from 'src/models/task-adminUpdate';

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

        const id = await this.auth.userId( request );
        const user = await this.taskService.getLoggedUser(id, request)

        if ( user.role.name !== 'Admin' ) {
            return {
                message: 'You are not an Admin, please contact your Project Manager'
            };
        };

        return this.taskService.paginate( page, [ 'user' ], pageSize );
    }

    // IN QUESTO METODO, OGNI UTENTE PUO' ACCEDERE ESCLUSIVAMENTE ALLE SUE TASKS
    @UseInterceptors( ClassSerializerInterceptor )
    @HasPermission( 'task' )
    @Get( 'user-tasks' )
    async userTask(
        @Req() request: Request ) {
        const id = await this.auth.userId( request );
        const user = await this.taskService.getLoggedUser(id, request)

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
    // UN UTENTE NON ADMIN NON PUO' ACCEDERE AD ALTRE TASKS
    @UseInterceptors( ClassSerializerInterceptor )
    @HasPermission( 'task' )
    @Get( ':id' )
    async get( @Param( 'id' ) id: number, @Req() request: Request ) {

        const user = await this.taskService.getLoggedUser(id, request)

        if ( user.role?.name !== 'Admin' ) {
            return { message: 'The task you are looking for does not belongs to you' };
        };
        
        return this.taskService.find( { id } );
    }

    // UN UTENTE PUO' MODIFICARE SOLAMENTE LO STATE DELLE SUE TASK, SENZA POTER MODIFICARE IL RESTO.
    @HasPermission( 'task' )
    @Put( ':id' )
    async updateTask(
        @Param( 'id' ) id: number,
        @Body() body: TaskUpdateDto,
        @Body() bodyAdmin: TaskAdminUpdateDto,
        @Req() request: Request
    ) {   
        const user = await this.taskService.getUserTasksIds(id, request)
        //verifico che gli id trovati, corrisponando con l'id della task che voglio modificare
        if ( user.includes( id.toString() ) ) {
            const data = body;
            await this.taskService.update( id, {
                state: data.state
            } );
            return this.taskService.find( { id } );
            //se l'utente loggato e' un admin, allora puo' modificare il post a piacimento
        } else if ( user.role?.name === 'Admin' ) {
            const { project_id, user_id, ...data } = bodyAdmin;
            await this.taskService.update( id, {
                ...data,
                project: { id: project_id },
                user: { id: user_id }
            } );
            return this.taskService.find( { id } );
        }

        return {
            message: 'YOU CANNOT MODIFY THIS TASK'
        };
    }

    @HasPermission( 'task' )
    @Delete( ':id' )
    async delete( @Param( 'id' ) id: number, @Req() request: Request ) {

        const user = await this.taskService.getLoggedUser(id, request)
        if ( user.role?.name !== 'Admin' ) {
            return { message: 'To delete a task contact your Admin' };
        };

        return this.taskService.delete( id );
    }


}
