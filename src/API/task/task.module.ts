import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { CommonModule } from '../../common/common.module';
import { Project } from '../../entities/project.entity';
import { Task } from '../../entities/task.entity';
import { UserModule } from '../user/user.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ Task, Project, User ] ),
    CommonModule,
    AuthModule,
    UserModule
  ],
  controllers: [ TaskController ],
  providers: [ TaskService ],
  exports: [ TaskService ]
} )
export class TaskModule {}
