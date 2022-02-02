
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import * as faker from '../../node_modules/faker';
import { AppModule } from '../app.module';
import { UserService } from '../API/user/user.service';


( async () => {
    const app = await NestFactory.createApplicationContext( AppModule );
    const userService = app.get( UserService );

    const password = await bcrypt.hash( "1234", 12 );

    for ( let i = 0; i < 10; i++ ) {
        await userService.create( {
            userName: faker.internet.userName(),
            password,
            role: faker.random.arrayElement( [ 1, 2 ] )
        } );
    }
    process.exit();
} )(); 