import { Module } from '@nestjs/common';
import { ChildCaresService } from './child-cares.service';
import { ChildCaresController } from './child-cares.controller';
import { ChildCareChildService } from 'src/child_care_child/child_care_child.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ChildCare } from './entities/child-care.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, ChildCare])],
    controllers: [ChildCaresController],
    providers: [ChildCaresService, ChildCareChildService, UsersService],
})
export class ChildCaresModule {}
