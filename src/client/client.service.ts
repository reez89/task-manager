import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from "src/client.entity";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository( Client )
        private userRepository: Repository<Client>
    ) {}


    getAllClients(): Promise<Client[]> {
        return this.userRepository.find( {
            relations: [ 'projects' ]
        } ); // SELECT * FROM users JOIN projects
    }

    async getClientById( id: number ): Promise<Client> {
        try {
            const user = await this.userRepository.findOneOrFail( id ); // SELECT * FROM users WHERE user.id = id
            return user;
        } catch ( err ) {
            console.log( err );
            throw err;
        }
    }

    createClient( name: string ): Promise<Client> {
        const newUser = this.userRepository.create( {
            name: name,
        } ); // INSERT 

        return this.userRepository.save( newUser );
    }

    async removeClient( id: number ): Promise<Client> {

        const user = await this.getClientById( id );

        return this.userRepository.remove( user );
    }

    async updateClient( id: number, name?: string ): Promise<Client> {
        const user = await this.getClientById( id );

        if ( name !== '' )
            user.name = name;
        else
            user.name;

        return this.userRepository.save( user );
    }
}