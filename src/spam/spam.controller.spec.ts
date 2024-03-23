import { Test, TestingModule } from '@nestjs/testing';
import { SpamController } from './spam.controller';
import { SpamService } from './spam.service';

describe('SpamController', () => {
  let controller: SpamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpamController],
      providers: [SpamService],
    }).compile();

    controller = module.get<SpamController>(SpamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
