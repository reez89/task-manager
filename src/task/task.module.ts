import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Task } from 'src/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ Task ] ),
    CommonModule
  ],
  controllers: [ TaskController ],
  providers: [ TaskService ]
} )
export class TaskModule {}
