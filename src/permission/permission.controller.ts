import { Body, Controller, Get, Post } from '@nestjs/common';
import { Permission } from 'src/permission.entity';
import { PermissionService } from './permission.service';

@Controller( 'permission' )
export class PermissionController {

    constructor( private permissionService: PermissionService ) {}


    @Get()
    async getAllPermissions(): Promise<Permission[]> {
        return this.permissionService.all();
    }

    @Post()
    async createPermission(
        @Body( 'name' ) name: string
    ): Promise<Permission> {
        return this.permissionService.create( { name } );
    }
}
