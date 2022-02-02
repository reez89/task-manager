
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import * as faker from '../../node_modules/faker';
import { AppModule } from '../app.module';
import { ProjectService } from '../API/project/project.service';



( async () => {
    const app = await NestFactory.createApplicationContext( AppModule );
    const projectService = app.get( ProjectService );

    for ( let i = 0; i < 10; i++ ) {
        await projectService.create( {
            projectName: faker.company.companyName(),
            clientName: faker.company.companyName(),
            expectedDelivery: faker.date.weekday(),
            status: faker.random.arrayElement( [ 'onHold', 'onGoing', 'onBoarding', 'close' ] )
        } );
    }
    process.exit();
} )(); 