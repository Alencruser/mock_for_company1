import { Test, TestingModule } from '@nestjs/testing';
import { ChildCaresController } from './child-cares.controller';
import { ChildCaresService } from './child-cares.service';

describe('ChildCaresController', () => {
  let controller: ChildCaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildCaresController],
      providers: [ChildCaresService],
    }).compile();

    controller = module.get<ChildCaresController>(ChildCaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
