import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { FindAllUsersResolver } from './find-all-users.resolver';
import { FindAllUsersService } from './find-all-users.service';

describe('FindAllUsersResolver', () => {
    let findAllUsersResolver: FindAllUsersResolver;
    let findAllUsersService: FindAllUsersService;
    let mockedUser: UserEntity;

    const mockfindAllUsersService = TestUtilsCommon.mockService();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAllUsersResolver,
                {
                    provide: FindAllUsersService,
                    useValue: mockfindAllUsersService,
                },
            ],
        }).compile();

        findAllUsersResolver =
            module.get<FindAllUsersResolver>(FindAllUsersResolver);
        findAllUsersService =
            module.get<FindAllUsersService>(FindAllUsersService);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        mockfindAllUsersService.execute.mockReset();
    });

    it('should be defined', () => {
        expect(findAllUsersResolver).toBeDefined();
        expect(findAllUsersService).toBeDefined();
        expect(mockfindAllUsersService).toBeDefined();
        expect(mockedUser).toBeDefined();
    });

    it('should find all users', async () => {
        const mockedUserArray = [mockedUser, mockedUser];

        mockfindAllUsersService.execute.mockResolvedValue(mockedUserArray);

        const findAllUsers = await findAllUsersResolver.handle();

        expect(findAllUsers).toEqual(mockedUserArray);
        expect(findAllUsersService.execute).toHaveBeenCalledWith();
    });
});
