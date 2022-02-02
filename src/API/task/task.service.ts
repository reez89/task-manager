import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../../auth/auth.service';
import { AbstractService } from '../../common/abstract.service';
import { Task } from '../../entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService extends AbstractService {

    constructor(
        @InjectRepository( Task )
        private taskRepository: Repository<Task>,
    ) {
        super( taskRepository );
    }


}
