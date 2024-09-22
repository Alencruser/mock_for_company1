import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildCareChild } from 'src/child_care_child/entities/child-care-child.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';
import { Child } from './entities/child.entity';
import { ChildCare } from 'src/child-cares/entities/child-care.entity';
import { ChildCaresService } from 'src/child-cares/child-cares.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Child, ChildCareChild, ChildCare])],
    controllers: [ChildrenController],
    providers: [ChildrenService, UsersService, ChildCaresService],
})
export class ChildrenModule {}
