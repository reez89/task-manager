import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectCreateDto } from 'src/user/models/project-create.dto';
import { ProjectUpdateDto } from 'src/user/models/project-update.dto';

@UseGuards( AuthGuard )
@Controller( 'projects' )
export class ProjectController {
    constructor( private projectService: ProjectService ) {}

    @Get()
    async getProjects( @Query( 'page' ) page: number = 1 ) {

        return this.projectService.paginate( page, [ 'client', 'task' ] );
    }

    @Post()
    async create( @Body() body: ProjectCreateDto ) {
        return this.projectService.create( body );
    }

    @Get( ':id' )
    async get( @Param( 'id' ) id: number ) {
        return this.projectService.find( { id } );
    }

    @Put( ':id' )
    async update(
        @Param( 'id' ) id: number,
        @Body() body: ProjectUpdateDto ) {
        await this.projectService.update( id, body );

        return this.projectService.find( { id } );
    }

    @Delete( ':id' )
    async delete( @Param( 'id' ) id: number ) {
        return this.projectService.delete( id );
    }
}
