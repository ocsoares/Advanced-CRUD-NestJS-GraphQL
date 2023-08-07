import { Test, TestingModule } from '@nestjs/testing';
import { FindAllUsersService } from './find-all-users.service';

describe('FindAllUsersService', () => {
  let service: FindAllUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllUsersService],
    }).compile();

    service = module.get<FindAllUsersService>(FindAllUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
