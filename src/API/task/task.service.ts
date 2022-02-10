import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../../auth/auth.service';
import { AbstractService } from '../../common/abstract.service';
import { Task } from '../../entities/task.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService extends AbstractService {

    constructor(
        @InjectRepository( Task )
        private taskRepository: Repository<Task>,
        private auth: AuthService,
        private userService: UserService
    ) {
        super( taskRepository );
    }

    async getUserTasksIds(id: number, request: any ){
        //prendo lo userId che ha effettuato il login
        const userIds = await this.auth.userId( request );
        //recupero i dati dello user
        const user: any = await this.userService.find( 
            {id: userIds},[ 'task', 'role']
        );
        //mappo tutti gli id delle task
        const usersTaskId = await user.task?.map( task => task.id ).toString();
        
        return usersTaskId;
    }

    async getLoggedUser(id: number, request: any ){
        //prendo lo userId che ha effettuato il login
        const userIds = await this.auth.userId( request );
        //recupero i dati dello user
        const user: any = await this.userService.find( 
            {id: userIds},[ 'task', 'role']
        );
        
        return user;
    }


}
