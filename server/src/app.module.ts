import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ChildCaresModule } from './child-cares/child-cares.module';
import { UsersModule } from './users/users.module';
import { ChildrenModule } from './children/children.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.hostDb,
            port: Number(process.env.portDb),
            username: process.env.usernameDb,
            password: process.env.passwordDb,
            database: process.env.databaseName,
            entities: [],
        }),
        ChildCaresModule,
        UsersModule,
        ChildrenModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
