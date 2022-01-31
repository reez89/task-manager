import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';


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
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
} )
export class AppModule {}
