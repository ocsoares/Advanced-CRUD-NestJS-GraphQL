import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { FindAllUsersService } from './find-all-users.service';

describe('FindAllUsersService', () => {
    let findAllUsersService: FindAllUsersService;
    let userRepository: UserRepository;
    let mockedUser: UserEntity;

    const mockUserRepository = TestUtilsCommon.mockUserRepository();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindAllUsersService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        findAllUsersService =
            module.get<FindAllUsersService>(FindAllUsersService);
        userRepository = module.get(UserRepository);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        Object.values(mockUserRepository).forEach((mockedMethod) =>
            mockedMethod.mockReset(),
        );
    });

    it('should be defined', () => {
        expect(findAllUsersService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(mockUserRepository).toBeDefined();
        expect(mockedUser).toBeDefined();
    });

    it('should find all users', async () => {
        const mockedUserArray = [mockedUser, mockedUser];

        mockUserRepository.findAll.mockResolvedValue(mockedUserArray);
        const findAllUsers = await findAllUsersService.execute();

        expect(findAllUsers).toEqual(mockedUserArray);
        expect(userRepository.findAll).toHaveBeenCalledWith();
    });
});
