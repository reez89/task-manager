import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';


@Module( {
  imports: [
    TypeOrmModule.forFeature( [ User ] ),
    PassportModule,
    forwardRef( () => UserModule ),
    CommonModule
  ],
  providers: [ AuthService, UserService ],
  exports: [ AuthService ],
  controllers: [ AuthController ]
} )
export class AuthModule {}
