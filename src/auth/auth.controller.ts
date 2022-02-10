import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { UserService } from '../API/user/user.service';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';


@Controller( 'auth' )
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private auth: AuthService,
    ) {}

    @UseInterceptors( ClassSerializerInterceptor )
    @Post( 'register' )
    async register( @Body() body: RegisterDto ) {

        if ( body.password !== body.password_confirm ) {
            throw new BadRequestException( 'pw doesn t match' );
        }

        const hashedPw = await bcrypt.hash( body.password, 12 );


        return this.userService.create( {
            userName: body.userName,
            password: hashedPw,
            role: { id: 1 }
        } );
    }

    @UseInterceptors( ClassSerializerInterceptor )
    @Post( 'login' )
    async login(
        @Body( 'userName' ) userName: string,
        @Body( 'password' ) password: string,
        @Res( { passthrough: true } ) response: Response
    ) {
        const user = await this.userService.find( { userName }, [ 'role', 'task' ] );
        if ( !user ) {
            throw new NotFoundException( 'User not found' );
        }
        if ( !await bcrypt.compare( password, user.password ) ) {
            throw new BadRequestException( 'invalid credentials' );
        }
        const jwt = await this.jwtService.signAsync( { id: user.id } );

        response.cookie( 'jwt', jwt, { httpOnly: true } );
        return user;
    }

    @UseGuards( AuthGuard )
    @UseInterceptors( ClassSerializerInterceptor )
    @Get( 'user' )
    async user( @Req() request: Request ) {
        const id = await this.auth.userId( request );

        return this.userService.find( { id }, [ 'role' ] );
    }

    @Post( 'logout' )
    async logout( @Res( { passthrough: true } ) response: Response ) {
        response.clearCookie( 'jwt' );

        return {
            message: 'logout completed'
        };
    }


}
