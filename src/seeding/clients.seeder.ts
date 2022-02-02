
import { NestFactory } from '@nestjs/core';
import * as faker from '../../node_modules/faker';
import { AppModule } from '../app.module';
import { ClientService } from '../API/client/client.service';



( async () => {
    const app = await NestFactory.createApplicationContext( AppModule );
    const clientService = app.get( ClientService );

    for ( let i = 0; i < 10; i++ ) {
        await clientService.create( {
            name: faker.company.companyName()
        } );
    }
    process.exit();
} )(); 