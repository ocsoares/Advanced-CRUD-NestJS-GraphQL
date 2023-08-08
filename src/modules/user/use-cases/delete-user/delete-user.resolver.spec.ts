import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserResolver } from './delete-user.resolver';

describe('DeleteUserResolver', () => {
  let resolver: DeleteUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUserResolver],
    }).compile();

    resolver = module.get<DeleteUserResolver>(DeleteUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
