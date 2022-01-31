import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project.entity';
import { ProjectService } from 'src/project/project.service';
import { Task } from 'src/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Task, Project ] ) ],
  controllers: [ TaskController ],
  providers: [ TaskService, ProjectService ]
} )
export class TaskModule {}
