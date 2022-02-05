import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../../common/abstract.service';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { PaginatedResult } from 'src/common/paginated-result.interface';

@Injectable()
export class UserService extends AbstractService {


    constructor(
        @InjectRepository( User )
        private userRepository: Repository<User>,
    ) {
        super( userRepository );
    }

    async paginate( page: number = 1, relations: any[] = [], pageSize: number = 5 ): Promise<PaginatedResult> {

        const { data, meta } = await super.paginate( page, relations, pageSize );

        return {
            data: data.map( ( user: User ) => {
                const { password, ...data } = user;
                return data;
            } ),
            meta,
        };
    }
}
