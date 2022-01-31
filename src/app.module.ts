import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';

import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CommonModule } from './common/common.module';


@Module( {
  imports: [
    ClientModule,
    TypeOrmModule.forRoot( config ),
    ProjectModule,
    TaskModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
} )
export class AppModule {}
