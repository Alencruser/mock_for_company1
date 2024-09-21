import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { Child } from './entities/child.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Child])],
    controllers: [ChildrenController],
    providers: [ChildrenService, UsersService],
})
export class ChildrenModule {}
