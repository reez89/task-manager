import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from '../../common/common.module';
import { AuthModule } from '../../auth/auth.module';
import { Permission } from '../../entities/permission.entity';
import { Role } from 'src/entities/role.entity';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ User, Role, Permission ] ),
    CommonModule,
    forwardRef( () => AuthModule ),
  ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ]
} )
export class UserModule {}
