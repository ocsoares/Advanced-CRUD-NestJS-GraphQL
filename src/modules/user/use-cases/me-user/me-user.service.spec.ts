import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { UserNotFoundException } from '../../../../exceptions/user-exceptions/user-not-found.exception';
import { MeUserService } from './me-user.service';

describe('MeUserService', () => {
    let meUserService: MeUserService;
    let userRepository: UserRepository;
    let mockedUser: UserEntity;

    const mockUserRepository = TestUtilsCommon.mockUserRepository();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MeUserService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        meUserService = module.get<MeUserService>(MeUserService);
        userRepository = module.get(UserRepository);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        Object.values(mockUserRepository).forEach((mockedMethod) =>
            mockedMethod.mockReset(),
        );
    });

    it('should be defined', () => {
        expect(meUserService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(mockUserRepository).toBeDefined();
        expect(mockedUser).toBeDefined();
    });

    it('should show the logged user', async () => {
        mockUserRepository.findById.mockResolvedValue(mockedUser);

        const meUser = await meUserService.execute(mockedUser.id);

        expect(meUser).toEqual(mockedUser);
        expect(userRepository.findById).toHaveBeenCalledWith(mockedUser.id);
    });

    it(`should NOT show the logged user if the user doesn't exists with findById method`, async () => {
        await expect(meUserService.execute(mockedUser.id)).rejects.toThrow(
            new UserNotFoundException(),
        );

        expect(userRepository.findById).toHaveBeenCalledWith(mockedUser.id);
    });
});
