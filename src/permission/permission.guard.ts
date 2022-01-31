import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService
  ) {}
  async canActivate( context: ExecutionContext ) {

    const access = this.reflector.get<string>( 'access', context.getHandler() );
    if ( !access ) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const id = await this.authService.userId( request );

    const user: User = await this.userService.find( { id }, [ 'role' ] );
    const role: Role = await this.roleService.find( { id: user.role.id }, [ 'permissions' ] );

    if ( request.method === 'GET' ) {
      // se lo user ha edit ha anche view.
      return role.permissions.some( p => ( p.name === `view_${access}` ) || ( p.name === `edit_${access}` ) );

    }

    return role.permissions.some( p => p.name === `edit_${access}` );
  }
}
