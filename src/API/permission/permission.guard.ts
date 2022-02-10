import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Task } from 'src/entities/task.entity';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';
import { RoleService } from '../role/role.service';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private taskService: TaskService
  ) {}
  async canActivate( context: ExecutionContext ) {

    const access = this.reflector.get<string>( 'access', context.getHandler() );
    if ( !access ) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const id = await this.authService.userId( request );

    const user: User = await this.userService.find( { id }, [ 'role', 'task' ] );
    const role: Role = await this.roleService.find( { id: user.role.id }, [ 'permissions' ] );

    if ( request.method === 'GET' ) {
      return role.permissions.some( p => p.name === `edit_${access}` );
    }
    return role.permissions.some( p => p.name === `edit_${access}` );
  }
}
