import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { CreateUserService } from './create-user.service';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { EncryptPasswordHelper } from '../../../../helpers/encrypt-password.helper';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { UserAlreadyExistsByNameException } from '../../../../exceptions/user-exceptions/user-already-exists-by-name.exception';
import { UserAlreadyExistsByEmailException } from '../../../../exceptions/user-exceptions/user-already-exists-by-email.exception';
import { ErrorCreatingUserException } from '../../../../exceptions/user-exceptions/error-creating-user.exception';

describe('CreateUserService', () => {
    let createUserService: CreateUserService;
    let repository: UserRepository;
    let mockedUser: UserEntity;

    const mockUserRepository = {
        create: jest.fn(),
        findById: jest.fn(),
        findByName: jest.fn(),
        findByEmail: jest.fn(),
        findAll: jest.fn(),
        deleteOneById: jest.fn(),
        updateOneById: jest.fn(),
    };

    const createUserDTO = TestUtilsCommon.userDataDTO();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateUserService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        createUserService = module.get<CreateUserService>(CreateUserService);
        repository = module.get(UserRepository);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        Object.values(mockUserRepository).forEach((mockedMethod) =>
            mockedMethod.mockReset(),
        );
    });

    it('should be defined', () => {
        expect(createUserService).toBeDefined();
        expect(repository).toBeDefined();
        expect(mockUserRepository).toBeDefined();
        expect(mockedUser).toBeDefined();
        expect(createUserDTO).toBeDefined();
    });

    it('should create a new user', async () => {
        mockUserRepository.create.mockResolvedValue(mockedUser);

        const createUser = await createUserService.execute(createUserDTO);

        const isValidEncryptedPassword =
            await EncryptPasswordHelper.bcryptCompare(
                createUserDTO.password,
                mockedUser.password,
            );

        expect(createUser).toEqual(mockedUser);
        expect(isValidEncryptedPassword).toBe(true);
        expect(repository.create).toHaveBeenCalledWith({
            ...createUserDTO,
            password: expect.any(String),
        });
    });

    it('should NOT create a new user if the user already exists with findByName method', async () => {
        mockUserRepository.findByName.mockResolvedValue(createUserDTO);

        await expect(createUserService.execute(createUserDTO)).rejects.toThrow(
            new UserAlreadyExistsByNameException(),
        );

        expect(repository.findByName).toHaveBeenCalledWith(createUserDTO.name);
    });

    it('should NOT create a new user if the user already exists with findByEmail method', async () => {
        mockUserRepository.findByEmail.mockResolvedValue(createUserDTO);

        await expect(createUserService.execute(createUserDTO)).rejects.toThrow(
            new UserAlreadyExistsByEmailException(),
        );

        expect(repository.findByName).toHaveBeenCalledWith(createUserDTO.name);
    });

    it(`should return an InternalServerError if the created user doesn't exists`, async () => {
        await expect(createUserService.execute(createUserDTO)).rejects.toThrow(
            new ErrorCreatingUserException(),
        );

        expect(repository.findByName).toHaveBeenCalledWith(createUserDTO.name);
    });
});
