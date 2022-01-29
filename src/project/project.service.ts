import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client.entity';
import { Project } from 'src/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository( Project )
        private projectRepository: Repository<Project>
    ) {}


    getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find( {
            relations: [ 'client' ]
        } ); // S
    }

    createProject( projectName: string, clientName: string, expectedDelivery?: string, status?: string, client?: number ): Promise<Project> {
        const newProject = this.projectRepository.create( {
            projectName,
            clientName,
            expectedDelivery,
            status,
            client
        } );

        return this.projectRepository.save( newProject );
    }
}
