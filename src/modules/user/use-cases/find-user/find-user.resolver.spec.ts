import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { FindUserService } from './find-user.service';
import { FindUserResolver } from './find-user.resolver';

describe('FindUserService', () => {
    let findUserResolver: FindUserResolver;
    let findUserService: FindUserService;
    let mockedUser: UserEntity;

    const mockFindUserService = TestUtilsCommon.mockService();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindUserResolver,
                {
                    provide: FindUserService,
                    useValue: mockFindUserService,
                },
            ],
        }).compile();

        findUserResolver = module.get<FindUserResolver>(FindUserResolver);
        findUserService = module.get<FindUserService>(FindUserService);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        mockFindUserService.execute.mockReset();
    });

    it('should be defined', () => {
        expect(findUserResolver).toBeDefined();
        expect(findUserService).toBeDefined();
        expect(mockFindUserService).toBeDefined();
        expect(mockedUser).toBeDefined();
    });

    it('should find a user', async () => {
        mockFindUserService.execute.mockResolvedValue(mockedUser);

        const findUser = await findUserResolver.handle(mockedUser.id);

        expect(findUser).toEqual(mockedUser);
        expect(findUserService.execute).toHaveBeenCalledWith(mockedUser.id);
    });
});
