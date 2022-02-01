import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { Permission } from 'src/entities/permission.entity';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ User, Permission ] ),
    CommonModule,
    forwardRef( () => AuthModule ),

  ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ]
} )
export class UserModule {}
