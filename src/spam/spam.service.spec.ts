import { Test, TestingModule } from '@nestjs/testing';
import { SpamService } from './spam.service';

describe('SpamService', () => {
  let service: SpamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpamService],
    }).compile();

    service = module.get<SpamService>(SpamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
