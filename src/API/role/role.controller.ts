import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { HasPermission } from '../permission/permission-decorator';
import { RoleService } from './role.service';


@Controller( 'role' )
export class RoleController {

    constructor( private roleService: RoleService ) {}

    @Get()
    @HasPermission( 'roles' )
    async getAll() {
        return this.roleService.all();
    }

    @Post()
    @HasPermission( 'roles' )
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
    @HasPermission( 'roles' )

    async getUserById( @Param( 'id' ) id: number ) {
        return this.roleService.find( { id }, [ 'permissions' ] );
    }

    @Put( ':id' )
    @HasPermission( 'roles' )

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
    @HasPermission( 'roles' )

    async deleteUser( @Param( 'id' ) id: number ) {
        return this.roleService.delete( id );
    }

}
