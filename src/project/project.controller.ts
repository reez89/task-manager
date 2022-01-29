import { Controller, Get } from '@nestjs/common';
import { Client } from 'src/client.entity';
import { Project } from 'src/project.entity';
import { ProjectService } from './project.service';

@Controller( 'projects' )
export class ProjectController {
    constructor( private projectService: ProjectService ) {}

    @Get()
    getProjects(): Promise<Project[]> {
        // const project = await this.projectService.createProject(
        //     "test5",
        //     "test5",
        //     "test5",
        //     "test5",
        //     1
        // );
        return this.projectService.getAllProjects();
    }
}
