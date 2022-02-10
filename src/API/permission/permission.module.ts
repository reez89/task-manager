import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { CommonModule } from '../../common/common.module';
import { Permission } from '../../entities/permission.entity';
import { TaskModule } from '../task/task.module';
import { TaskService } from '../task/task.service';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ Permission, Task ] ),
    CommonModule,

  ],
  controllers: [ PermissionController ],
  providers: [ PermissionService, TaskService ]
} )
export class PermissionModule {}
