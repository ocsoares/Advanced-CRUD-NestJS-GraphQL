import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { UserNotFoundException } from '../../../../exceptions/user-exceptions/user-not-found.exception';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UpdateUserService } from './update-user.service';
import { EncryptPasswordHelper } from '../../../../helpers/encrypt-password.helper';
import { ErrorUpdatingUserException } from '../../../../exceptions/user-exceptions/error-updating-user.exception';

describe('UpdateUserService', () => {
    let updateUserService: UpdateUserService;
    let userRepository: UserRepository;

    // it can't be "TestUtilsCommon.newUser(true)" because it uses "EncryptPasswordHelper.bcryptEncrypt()" and
    // that interferes with the "bcryptEncryptSpy" tests
    const savedUser: UserEntity = {
        id: '359bfd57-b4f7-4d3c-b0e4-161aa78cae72',
        name: 'Saved User',
        email: 'savedUser@gmail.com',
        password: 'savedUser123',
    };

    const updateUserDTO: UpdateUserDTO = {
        name: 'Update User',
        email: 'updateUser@gmail.com',
        password: 'updateUser123',
    };

    const mockUserRepository = TestUtilsCommon.mockUserRepository();

    const bcryptEncryptSpy = jest.spyOn(EncryptPasswordHelper, 'bcryptEncrypt');

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UpdateUserService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        updateUserService = module.get<UpdateUserService>(UpdateUserService);
        userRepository = module.get(UserRepository);
    });

    afterEach(() => {
        Object.values(mockUserRepository).forEach((mockedMethod) =>
            mockedMethod.mockReset(),
        );

        bcryptEncryptSpy.mockReset();
    });

    it('should be defined', () => {
        expect(updateUserService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(mockUserRepository).toBeDefined();
    });

    it('should update a full user', async () => {
        mockUserRepository.findById.mockResolvedValue(savedUser);

        // Because the password will be encrypted in "updateUserDTO"
        const updateUserPass = 'updateUser123';

        mockUserRepository.updateOneById.mockResolvedValue(updateUserDTO);

        const updatedUser = await updateUserService.execute(
            savedUser.id,
            updateUserDTO,
        );

        expect(updatedUser).toEqual(updateUserDTO);
        expect(userRepository.findById).toHaveBeenCalledWith(savedUser.id);
        expect(bcryptEncryptSpy).toHaveBeenCalledWith(updateUserPass, 10);
        expect(userRepository.updateOneById).toHaveBeenCalledWith(
            savedUser.id,
            updateUserDTO,
        );
    });

    it('should update a user but not changing the password', async () => {
        mockUserRepository.findById.mockResolvedValue(savedUser);

        updateUserDTO.password = savedUser.password;

        mockUserRepository.updateOneById.mockResolvedValue(updateUserDTO);

        const updatedUser = await updateUserService.execute(
            savedUser.id,
            updateUserDTO,
        );

        expect(updatedUser).toEqual(updateUserDTO);
        expect(userRepository.findById).toHaveBeenCalledWith(savedUser.id);
        expect(bcryptEncryptSpy).toHaveBeenCalledTimes(0);
        expect(userRepository.updateOneById).toHaveBeenCalledWith(
            savedUser.id,
            updateUserDTO,
        );
    });

    it(`should NOT update a user if the user doesn't exists with findById method`, async () => {
        await expect(
            updateUserService.execute(savedUser.id, updateUserDTO),
        ).rejects.toThrow(new UserNotFoundException());

        expect(userRepository.findById).toHaveBeenCalledWith(savedUser.id);
        expect(bcryptEncryptSpy).toHaveBeenCalledTimes(0);
        expect(userRepository.updateOneById).toHaveBeenCalledTimes(0);
    });

    it(`should throw an InternalServerError if the updated user doesn't exists`, async () => {
        mockUserRepository.findById.mockResolvedValue(savedUser);

        mockUserRepository.updateOneById.mockResolvedValue(null);

        await expect(
            updateUserService.execute(savedUser.id, updateUserDTO),
        ).rejects.toThrow(new ErrorUpdatingUserException());

        expect(userRepository.findById).toHaveBeenCalledWith(savedUser.id);
        expect(bcryptEncryptSpy).toHaveBeenCalledTimes(0);
        expect(userRepository.updateOneById).toHaveBeenCalledWith(
            savedUser.id,
            updateUserDTO,
        );
    });
});
