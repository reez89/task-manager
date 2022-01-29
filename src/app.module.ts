import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';


@Module( {
  imports: [
    ClientModule,
    TypeOrmModule.forRoot( config ),
    ProjectModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
} )
export class AppModule {}
