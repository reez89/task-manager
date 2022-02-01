import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';

import { ProjectCreateDto } from 'src/models/project-create.dto';
import { ProjectUpdateDto } from 'src/models/project-update.dto';
import { HasPermission } from '../permission/permission-decorator';
import { AuthGuard } from 'src/auth/auth.guard';



@UseGuards( AuthGuard )
@Controller( 'projects' )
export class ProjectController {
    constructor( private projectService: ProjectService ) {}

    @HasPermission( 'client' )
    @Get()
    async getProjects( @Query( 'page' ) page: number = 1 ) {

        return this.projectService.paginate( page, [ 'client', 'task' ] );
    }

    @HasPermission( 'client' )
    @Post()
    async create( @Body() body: ProjectCreateDto ) {
        const { client_id, ...data } = body;
        return this.projectService.create( {
            ...data,
            client: { id: client_id }
        } );
    }
    @HasPermission( 'client' )
    @Get( ':id' )
    async get( @Param( 'id' ) id: number ) {
        return this.projectService.find( { id } );
    }

    @HasPermission( 'client' )
    @Put( ':id' )
    async update(
        @Param( 'id' ) id: number,
        @Body() body: ProjectUpdateDto ) {

        const { client_id, ...data } = body;
        await this.projectService.update( id, {
            ...data,
            client: { id: client_id }
        } );

        return this.projectService.find( { id } );
    }
    @HasPermission( 'client' )
    @Delete( ':id' )
    async delete( @Param( 'id' ) id: number ) {
        return this.projectService.delete( id );
    }
}
