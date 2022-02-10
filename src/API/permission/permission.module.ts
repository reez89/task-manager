import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { CommonModule } from '../../common/common.module';
import { Permission } from '../../entities/permission.entity';
import { TaskModule } from '../task/task.module';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ Permission, Task , User] ),
    CommonModule,

  ],
  controllers: [ PermissionController ],
  providers: [ PermissionService, TaskService, AuthService , UserService]
} )
export class PermissionModule {}
