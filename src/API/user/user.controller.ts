import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { HasPermission } from '../permission/permission-decorator';
import { UserCreateDto } from '../../models/user-create.dto';
import { UserUpdateDto } from '../../models/user-update.dto';
import { AuthGuard } from '../../auth/auth.guard';


@UseGuards( AuthGuard )
@Controller( 'user' )
export class UserController {

    constructor(
        private userService: UserService ) {}

    @UseInterceptors( ClassSerializerInterceptor )
    @Get()
    @HasPermission( 'user' )
    async getAllUsers( @Query( 'page' ) page: number = 1 ) {
        return this.userService.paginate( page, [ 'role', 'task' ] );

    }

    @UseInterceptors( ClassSerializerInterceptor )
    @Post()
    @HasPermission( 'user' )
    async create( @Body() body: UserCreateDto ): Promise<User> {
        const password = await bcrypt.hash( '1234', 12 );

        const { role_id, ...data } = body;

        return this.userService.create( {
            ...data,
            password: password,
            role: { id: role_id }
        } );
    }
    @UseInterceptors( ClassSerializerInterceptor )
    @Get( ':id' )
    @HasPermission( 'user' )

    async getUserById( @Param( 'id' ) id: number ) {
        return this.userService.find( { id }, [ 'role', 'task' ] );
    }

    @Put( ':id' )
    @HasPermission( 'user' )
    async updateUser(
        @Param( 'id' ) id: number,
        @Body() body: UserUpdateDto
    ) {

        const { role_id, ...data } = body;

        await this.userService.update( id, {
            ...data,
            role: { id: role_id }
        } );

        return this.userService.find( { id } );
    }

    @Delete( ':id' )
    @HasPermission( 'user' )
    async deleteUser( @Param( 'id' ) id: number ) {
        return this.userService.delete( id );
    }
}
