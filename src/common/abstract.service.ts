import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {

    constructor( 
        protected readonly repository: Repository<any>,
        ) {}

    async all( relations: any = [] ): Promise<any[]> {
        return this.repository.find( { relations } );
    }

    async paginate(
        page: number = 1,
        relations: any[] = [],
        pageSize?: number ): Promise<PaginatedResult> {
        const take = pageSize || 5;
        const [ data, total ] = await this.repository.findAndCount(
            {
                take,
                skip: ( page - 1 ) * take,
                relations,
            }
        );
        return {
            data: data,
            meta: {
                total,
                page,
                pageSize: pageSize,
                lastPage: Math.ceil( total / take ),
            }
        };
    }

    async create( data ): Promise<any> {
        return this.repository.save( data );
    }

    async find( condition, relations: any = [] ): Promise<any> {
        return this.repository.findOne( condition, { relations } );
    }

    async update( id: number, data: any ): Promise<any> {
        return this.repository.update( id, data );
    }

    async delete( id: number ): Promise<any> {
        return this.repository.delete( id );
    }

}
