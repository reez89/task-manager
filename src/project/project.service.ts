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
            relations: [ 'client', 'task' ]
        } ); // S
    }

    async getProjectById( id: number ): Promise<Project> {
        try {
            const project = await this.projectRepository.findOneOrFail( id ); // SELECT * FROM users WHERE user.id = id
            return project;
        } catch ( err ) {
            console.log( err );
            throw err;
        }
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

    async updateProject( id: number, status: string ): Promise<Project> {
        const project = await this.getProjectById( id );

        project.status = status;
        return this.projectRepository.save( project );
    };

    async removeProject( id: number ): Promise<Project> {

        const project = await this.getProjectById( id );

        return this.projectRepository.remove( project );
    }
}
