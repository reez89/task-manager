import { Controller, Get } from '@nestjs/common';
import { Client } from 'src/client.entity';
import { ClientService } from './client.service';

@Controller( 'clients' )
export class ClientController {
    constructor( private userService: ClientService ) {}
    @Get()
    allUsers(): Promise<Client[]> {
        // const user = await this.userService.createClient( 'YOLO', );

        return this.userService.getAllClients();
    }
}
