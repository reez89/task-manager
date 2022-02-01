import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService extends AbstractService {


    constructor(
        @InjectRepository( Project )
        private projectRepository: Repository<Project>
    ) {
        super( projectRepository );
    }


    getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find( {
            relations: [ 'client', 'task' ]
        } );
    }
}
