import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PermissionService } from '../API/permission/permission.service';
import { RoleService } from '../API/role/role.service';


( async () => {
    const app = await NestFactory.createApplicationContext( AppModule );
    const permissionService = app.get( PermissionService );
    const roleService = app.get( RoleService );


    const permissions: string[] =
        [
            'view_user',
            'view_roles',
            'view_project',
            'view_client',
            'edit_roles',
            'edit_task',
            'edit_client',
            'edit_project',
            'view_permissions',
            'view_task',
            'edit_permissions',
            'edit_user'
        ];

    let adminPermission: number[] = [];
    for ( let i = 0; i < permissions.length; i++ ) {
        await permissionService.create( {
            name: permissions[ i ],
        } );

        adminPermission.push( i + 1 );

    }

    await roleService.create( {
        name: 'Project Manager',
        permissions: adminPermission.map( id => ( { id } ) )
    } );


    await roleService.create( {
        name: 'Developer',
        permissions: [ { id: 6 } ]
    } );

    process.exit();
} )();  