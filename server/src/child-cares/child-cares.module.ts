import { Module } from '@nestjs/common';
import { ChildCaresService } from './child-cares.service';
import { ChildCaresController } from './child-cares.controller';

@Module({
  controllers: [ChildCaresController],
  providers: [ChildCaresService],
})
export class ChildCaresModule {}
