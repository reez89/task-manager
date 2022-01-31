import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { AbstractService } from 'src/common/abstract.service';
import { Task } from 'src/entities/task.entity';
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
