import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {

    constructor( protected readonly repository: Repository<any> ) {}

    getAllUsers(): Promise<any[]> {
        return this.repository.find( {
            relations: [ 'task' ]
        } );
    }

    all( relations: any = [] ): Promise<any[]> {
        return this.repository.find( { relations } );
    }

    async paginate( page: number = 1, relations: any[] = [] ): Promise<PaginatedResult> {
        const take = 10;
        const [ data, total ] = await this.repository.findAndCount(
            {
                take,
                skip: ( page - 1 ) * take,
                relations
            }
        );
        return {
            data: data,
            meta: {
                total,
                page,
                lastPage: Math.ceil( total / take )
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
