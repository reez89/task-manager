import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Client } from 'src/entities/client.entity';
import { ClientCreateDto } from 'src/models/client-create.dto';
import { ClientUpdateDto } from 'src/models/client-update.dto';
import { ClientService } from './client.service';

@Controller( 'clients' )
export class ClientController {
    constructor( private clientService: ClientService ) {}


    @Get()
    all( @Query( 'page' ) page: number = 1 ) {
        return this.clientService.paginate( page, [ 'projects' ] );
    }

    @Post()
    async createTask( @Body() body: ClientCreateDto ) {
        return this.clientService.create( body );
    }

    @Get( ':id' )
    async get( @Param( 'id' ) id: number ) {
        return this.clientService.find( { id } );
    }

    @Put( ':id' )
    async updateTask(
        @Param( 'id' ) id: number,
        @Body() body: ClientUpdateDto ) {
        await this.clientService.update( id, body );

        return this.clientService.find( { id } );
    }

    @Delete( ':id' )
    async delete( @Param( 'id' ) id: number ) {
        return this.clientService.delete( id );
    }
}
