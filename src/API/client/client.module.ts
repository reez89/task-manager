import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { CommonModule } from '../../common/common.module';
import { Client } from '../../entities/client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Client, Project ] ), CommonModule, ],
  controllers: [ ClientController ],
  providers: [ ClientService ]
} )
export class ClientModule {}
