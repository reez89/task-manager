import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';


@Module( {
  imports: [
    TypeOrmModule.forFeature( [ User ] ),
    PassportModule,
    UserModule,
    CommonModule
  ],
  providers: [ AuthService, UserService ],
  controllers: [ AuthController ]
} )
export class AuthModule {}
