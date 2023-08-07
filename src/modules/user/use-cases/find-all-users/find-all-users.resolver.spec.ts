import { Test, TestingModule } from '@nestjs/testing';
import { FindAllUsersResolver } from './find-all-users.resolver';

describe('FindAllUsersResolver', () => {
  let resolver: FindAllUsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllUsersResolver],
    }).compile();

    resolver = module.get<FindAllUsersResolver>(FindAllUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
