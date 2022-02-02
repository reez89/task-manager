import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { Project } from '../../entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ Project ] ),
    CommonModule
  ],
  controllers: [ ProjectController ],
  providers: [ ProjectService ]
} )
export class ProjectModule {}
