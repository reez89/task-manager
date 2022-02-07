import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';

import { ProjectCreateDto } from '../../models/project-create.dto';
import { ProjectUpdateDto } from '../../models/project-update.dto';
import { HasPermission } from '../permission/permission-decorator';
import { AuthGuard } from '../../auth/auth.guard';



@UseGuards( AuthGuard )
@Controller( 'projects' )
export class ProjectController {
    constructor( private projectService: ProjectService ) {}

    @HasPermission( 'project' )
    @Get()
    async getProjects( @Query( 'page' ) page: number = 1, @Query( 'pageSize' ) pageSize: number ) {

        return this.projectService.paginate( page, [ 'client', 'task' ], pageSize );
    }

    @HasPermission( 'project' )
    @Post()
    async create( @Body() body: ProjectCreateDto ) {
        const { ...data } = body;
        return this.projectService.create( {
            ...data,
        } );
    }
    @HasPermission( 'project' )
    @Get( ':id' )
    async get( @Param( 'id' ) id: number ) {
        return this.projectService.find( { id } );
    }

    @HasPermission( 'project' )
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
    @HasPermission( 'project' )
    @Delete( ':id' )
    async delete( @Param( 'id' ) id: number ) {
        return this.projectService.delete( id );
    }
}
