
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import * as faker from '../../node_modules/faker';
import { AppModule } from '../app.module';
import { TaskService } from '../API/task/task.service';



( async () => {
    const app = await NestFactory.createApplicationContext( AppModule );
    const taskService = app.get( TaskService );

    for ( let i = 0; i < 10; i++ ) {
        await taskService.create( {
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            priority: faker.random.arrayElement( [ 'low', 'medium', 'high' ] ),
            state: faker.random.arrayElement( [ 'to Do', 'on Hold', 'onGoing', 'close' ] )
        } );
    }
    process.exit();
} )(); 