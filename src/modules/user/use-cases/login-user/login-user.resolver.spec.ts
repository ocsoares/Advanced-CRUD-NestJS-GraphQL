import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserResolver } from './login-user.resolver';

describe('LoginUserResolver', () => {
  let resolver: LoginUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginUserResolver],
    }).compile();

    resolver = module.get<LoginUserResolver>(LoginUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
