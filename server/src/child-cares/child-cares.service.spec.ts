import { Test, TestingModule } from '@nestjs/testing';
import { ChildCaresService } from './child-cares.service';

describe('ChildCaresService', () => {
  let service: ChildCaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildCaresService],
    }).compile();

    service = module.get<ChildCaresService>(ChildCaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
