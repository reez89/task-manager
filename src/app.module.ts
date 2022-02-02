import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ClientModule } from './API/client/client.module';

import { CommonModule } from './common/common.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './API/project/project.module';
import { TaskModule } from './API/task/task.module';
import { UserModule } from './API/user/user.module';
import { RoleModule } from './API/role/role.module';
import { PermissionModule } from './API/permission/permission.module';
import { PermissionGuard } from './API/permission/permission.guard';

@Module( {
  imports: [
    ClientModule,
    TypeOrmModule.forRoot( {
      type: 'sqlite',
      database: 'db',
      entities: [ 'dist/src/entities/*.entity.js' ],
      //IMPOSTARE sync a FALSE PER UTILIZZARE LA MIGRATION
      synchronize: true,
      autoLoadEntities: true,
      /* DISATTIVARE IN CASO SI VOGLIA UTILIZZARE LA MIGRATION PER AGGIORNARE LA TABELLA */
      // migrations: [
      //     'dist/src/db/migrations/*.js'
      // ],
      // cli: {
      //     migrationsDir: "src/db/migrations"
      // }
    } ),
    ProjectModule,
    TaskModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    ClientModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    },
  ],
} )
export class AppModule {}
