import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

@Controller()
export class UserController {

    constructor( private userService: UserService, private authService: AuthService ) {}

    @Get( 'users' )
    async getAllUsers() {
        return this.userService.getAllUsers();

    }


}
