import { Test, TestingModule } from '@nestjs/testing';
import { FindUserService } from './find-user.service';

describe('FindUserService', () => {
  let service: FindUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserService],
    }).compile();

    service = module.get<FindUserService>(FindUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
