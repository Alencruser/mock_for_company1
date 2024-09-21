import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChildCaresModule } from './child-cares/child-cares.module';
import { ChildrenModule } from './children/children.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ChildCare } from './child-cares/entities/child-care.entity';
import { Child } from './children/entities/child.entity';

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
            entities: [User, ChildCare, Child],
        }),
        TypeOrmModule.forFeature([User]),
        ChildCaresModule,
        UsersModule,
        ChildrenModule,
    ],
    controllers: [AppController],
    providers: [AppService, UsersService],
})
export class AppModule {}
