import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CommonModule } from '../../common/common.module';
import { Project } from '../../entities/project.entity';
import { Task } from '../../entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ Task, Project, User ] ),
    CommonModule,
  ],
  controllers: [ TaskController ],
  providers: [ TaskService ]
} )
export class TaskModule {}
