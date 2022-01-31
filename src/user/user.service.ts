import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends AbstractService {


    constructor(
        @InjectRepository( User )
        private userRepository: Repository<User>,
    ) {
        super( userRepository );
    }

    async paginate( page: number = 1, relations: any[] = [] ): Promise<any> {

        const { data, meta } = await super.paginate( page, relations );

        return {
            data: data.map( user => {
                const { password, ...data } = user;
                return data;
            } ),
            meta
        };
    }
}
