import { Module } from '@nestjs/common';
import { ChildCaresService } from './child-cares.service';
import { ChildCaresController } from './child-cares.controller';
import { ChildCareChildService } from 'src/child_care_child/child_care_child.service';

@Module({
    controllers: [ChildCaresController],
    providers: [ChildCaresService, ChildCareChildService],
})
export class ChildCaresModule {}
