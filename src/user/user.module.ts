import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Task } from 'src/task.entity';
import { TaskService } from 'src/task/task.service';
import { User } from 'src/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { Permission } from 'src/permission.entity';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ User, Task, Permission ] ), CommonModule ],
  controllers: [ UserController ],
  providers: [ UserService, TaskService, AuthService ]
} )
export class UserModule {}
