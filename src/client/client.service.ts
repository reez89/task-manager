import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from "src/entities/client.entity";
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class ClientService extends AbstractService {
    constructor(
        @InjectRepository( Client )
        private userRepository: Repository<Client>
    ) {
        super( userRepository );
    }


    getAllClients(): Promise<Client[]> {
        return this.userRepository.find( {
            relations: [ 'projects' ]
        } ); // SELECT * FROM users JOIN projects
    }
}