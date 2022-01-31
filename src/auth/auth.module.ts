import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ User ] ),
    PassportModule,
    UserModule,
    JwtModule.register( {
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    } ),
  ],
  providers: [ AuthService, UserService, LocalStrategy ],
  controllers: [ AuthController ]
} )
export class AuthModule {}
