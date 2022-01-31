import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {


    constructor(
        @InjectRepository( User )
        private userRepository: Repository<User>,
    ) {}

    getAllUsers(): Promise<User[]> {
        return this.userRepository.find( {
            relations: [ 'task' ]
        } ); // S
    }

    async createUser( data ): Promise<User> {
        return this.userRepository.save( data );
    }

    async findOneUser( condition ): Promise<User> {
        return this.userRepository.findOne( condition );
    }

    async getUserByName( username: string ): Promise<any> {
        const user: User = await this.userRepository.createQueryBuilder()
            .where( 'user.username LIKE :username', { username } )
            .select( [
                "user.id",
                "user.userName",
                'user.role'
            ] )
            .execute();
        return user[ 0 ];
    }

}
