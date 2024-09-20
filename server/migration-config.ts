import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '.env') });

let connectionOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.hostDb,
    port: Number(process.env.portDb),
    username: process.env.usernameDb,
    password: process.env.passwordDb,
    database: process.env.databaseName,
    entities: [],
    migrations: ['./migrations/*{.ts,.js}'], // where our migrations reside
};

console.log(process.env.usernameDb);

export default new DataSource({
    ...connectionOptions,
});
