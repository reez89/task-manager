import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../../common/abstract.service';
import { Role } from '../../entities/role.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService extends AbstractService {
    constructor(
        @InjectRepository( Role ) private roleRepository: Repository<Role>
    ) {
        super( roleRepository );
    }

}
