import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserResolver } from './update-user.resolver';

describe('UpdateUserResolver', () => {
  let resolver: UpdateUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserResolver],
    }).compile();

    resolver = module.get<UpdateUserResolver>(UpdateUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
