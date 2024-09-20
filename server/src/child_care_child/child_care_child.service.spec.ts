import { Test, TestingModule } from '@nestjs/testing';
import { ChildCareChildService } from './child_care_child.service';

describe('ChildCareChildService', () => {
  let service: ChildCareChildService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildCareChildService],
    }).compile();

    service = module.get<ChildCareChildService>(ChildCareChildService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
