import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { FindUserService } from './find-user.service';
import { UserNotFoundException } from '../../../../exceptions/user-exceptions/user-not-found.exception';

describe('FindUserService', () => {
    let findUserService: FindUserService;
    let userRepository: UserRepository;
    let mockedUser: UserEntity;

    const mockUserRepository = TestUtilsCommon.mockUserRepository();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindUserService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        findUserService = module.get<FindUserService>(FindUserService);
        userRepository = module.get(UserRepository);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        Object.values(mockUserRepository).forEach((mockedMethod) =>
            mockedMethod.mockReset(),
        );
    });

    it('should be defined', () => {
        expect(findUserService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(mockUserRepository).toBeDefined();
        expect(mockedUser).toBeDefined();
    });

    it('should find a user', async () => {
        mockUserRepository.findById.mockResolvedValue(mockedUser);

        const findUser = await findUserService.execute(mockedUser.id);

        expect(findUser).toEqual(mockedUser);
        expect(userRepository.findById).toHaveBeenCalledWith(mockedUser.id);
    });

    it(`should NOT find a user if the user doesn't exists with findById method`, async () => {
        await expect(findUserService.execute(mockedUser.id)).rejects.toThrow(
            new UserNotFoundException(),
        );

        expect(userRepository.findById).toHaveBeenCalledWith(mockedUser.id);
    });
});
