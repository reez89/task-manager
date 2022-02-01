import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { User } from 'src/entities/user.entity';
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
