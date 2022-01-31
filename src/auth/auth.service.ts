import { Injectable } from '@nestjs/common';
import { User } from 'src/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor( private userService: UserService ) {}

    async validateUser( username: string ): Promise<User> {
        const user: User = await this.userService.getUserByName( username );


        return null;
    }
}
