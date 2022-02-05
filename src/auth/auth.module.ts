import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from '../common/common.module';
import { UserService } from '../API/user/user.service';
import { UserModule } from '../API/user/user.module';
import { Role } from 'src/entities/role.entity';
import { RoleService } from 'src/API/role/role.service';



@Module( {
  imports: [
    TypeOrmModule.forFeature( [ User, Role ] ),
    PassportModule,
    forwardRef( () => UserModule ),
    CommonModule
  ],
  providers: [ AuthService, UserService, RoleService ],
  exports: [ AuthService ],
  controllers: [ AuthController ]
} )
export class AuthModule {}
