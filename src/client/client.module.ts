import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Client } from 'src/entities/client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Client ] ), CommonModule, ],
  controllers: [ ClientController ],
  providers: [ ClientService ]
} )
export class ClientModule {}
