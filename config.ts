import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db',
    entities: [ 'dist/src/**/*.entity.js' ],
    synchronize: true,

    /* DISATTIVARE IN CASO SI VOGLIA UTILIZZARE LA MIGRATION PER AGGIORNARE LA TABELLA */
    // migrations: [
    //     'dist/src/db/migrations/*.js'
    // ],
    // cli: {
    //     migrationsDir: "src/db/migrations"
    // }
};


export default config;