import { Test, TestingModule } from '@nestjs/testing';
import { FindUserResolver } from './find-user.resolver';

describe('FindUserResolver', () => {
  let resolver: FindUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserResolver],
    }).compile();

    resolver = module.get<FindUserResolver>(FindUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
