import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { DeleteUserService } from './delete-user.service';
import { UserNotFoundException } from '../../../../exceptions/user-exceptions/user-not-found.exception';
import { ErrorDeletingUserException } from '../../../../exceptions/user-exceptions/error-deleting-user.exception';

describe('DeleteUserService', () => {
    let deleteUserService: DeleteUserService;
    let userRepository: UserRepository;
    let mockedUser: UserEntity;

    const mockUserRepository = TestUtilsCommon.mockUserRepository();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                DeleteUserService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        deleteUserService = module.get<DeleteUserService>(DeleteUserService);
        userRepository = module.get(UserRepository);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        Object.values(mockUserRepository).forEach((mockedMethod) =>
            mockedMethod.mockReset(),
        );
    });

    it('should be defined', () => {
        expect(deleteUserService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(mockUserRepository).toBeDefined();
        expect(mockedUser).toBeDefined();
    });

    it('should delete a user', async () => {
        mockUserRepository.findById.mockResolvedValue(mockedUser);

        mockUserRepository.deleteOneById.mockResolvedValue(mockedUser);

        const deletedUser = await deleteUserService.execute(mockedUser.id);

        expect(deletedUser).toEqual(true);
        expect(userRepository.findById).toHaveBeenCalledWith(mockedUser.id);
        expect(userRepository.deleteOneById).toHaveBeenCalledWith(
            mockedUser.id,
        );
    });

    it(`should NOT delete a user if the user doesn't exists with findById method`, async () => {
        await expect(deleteUserService.execute(mockedUser.id)).rejects.toThrow(
            new UserNotFoundException(),
        );

        expect(userRepository.findById).toHaveBeenCalledWith(mockedUser.id);
        expect(userRepository.deleteOneById).toHaveBeenCalledTimes(0);
    });

    it(`should throw an InternalServerError if the deleted user doesn't exists`, async () => {
        mockUserRepository.findById.mockResolvedValue(mockedUser);

        mockUserRepository.deleteOneById.mockResolvedValue(null);

        await expect(deleteUserService.execute(mockedUser.id)).rejects.toThrow(
            new ErrorDeletingUserException(),
        );

        expect(mockUserRepository.findById).toHaveBeenCalledWith(mockedUser.id);
        expect(mockUserRepository.deleteOneById).toHaveBeenCalledWith(
            mockedUser.id,
        );
    });
});
