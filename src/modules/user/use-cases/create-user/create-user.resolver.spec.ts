import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserResolver } from './create-user.resolver';

describe('CreateUserResolver', () => {
    let resolver: CreateUserResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateUserResolver],
        }).compile();

        resolver = module.get<CreateUserResolver>(CreateUserResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
