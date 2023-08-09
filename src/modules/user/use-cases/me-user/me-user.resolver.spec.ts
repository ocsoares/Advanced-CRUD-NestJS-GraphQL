import { Test, TestingModule } from '@nestjs/testing';
import { MeUserResolver } from './me-user.resolver';

describe('MeUserResolver', () => {
  let resolver: MeUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeUserResolver],
    }).compile();

    resolver = module.get<MeUserResolver>(MeUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
