import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Permission } from 'src/entities/permission.entity';
import { PermissionService } from './permission.service';

@UseGuards( AuthGuard )
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
