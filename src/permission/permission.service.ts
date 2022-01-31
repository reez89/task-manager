import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Permission } from 'src/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService extends AbstractService {

    constructor(
        @InjectRepository( Permission ) private permissionRepository: Repository<Permission>
    ) {
        super( permissionRepository );
    }
}
