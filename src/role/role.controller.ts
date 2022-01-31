import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Role } from 'src/role.entity';
import { RoleService } from './role.service';


@Controller( 'role' )
export class RoleController {

    constructor( private roleService: RoleService ) {}

    @Get()
    async getAll() {
        return this.roleService.all();
    }

    @Post()
    async createRole(
        @Body( 'name' ) name: string,
        @Body( 'permissions' ) ids: number[]
    ): Promise<Role> {
        return this.roleService.create( {
            name,
            permissions: ids.map( id => ( { id } ) )
        } );
    }


    @UseInterceptors( ClassSerializerInterceptor )
    @Get( ':id' )
    async getUserById( @Param( 'id' ) id: number ) {
        return this.roleService.find( { id }, [ 'permissions' ] );
    }

    @Put( ':id' )
    async updateRole(
        @Param( 'id' ) id: number,
        @Body( 'name' ) name: string,
        @Body( 'permissions' ) ids: number[]
    ) {
        await this.roleService.update( id, {
            name
        } );

        const role = await this.roleService.find( { id } );

        return this.roleService.create( {
            ...role,
            permissions: ids.map( id => ( { id } ) )
        } );
    }

    @Delete( ':id' )
    async deleteUser( @Param( 'id' ) id: number ) {
        return this.roleService.delete( id );
    }

}
