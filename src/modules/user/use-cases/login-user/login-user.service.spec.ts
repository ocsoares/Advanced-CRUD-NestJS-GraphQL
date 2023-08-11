import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { EncryptPasswordHelper } from '../../../../helpers/encrypt-password.helper';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { LoginUserService } from './login-user.service';
import { AuthTestModule } from '../../../../modules/test/auth-module/auth-test.module';
import { TokenType } from 'src/graphql/types/token.type';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from '../../../../exceptions/auth-exceptions/invalid-credentials.exception';

describe('LoginUserService', () => {
    let loginUserService: LoginUserService;
    let userRepository: UserRepository;
    let mockedUser: UserEntity;

    const mockUserRepository = TestUtilsCommon.mockUserRepository();
    const mockJwtService = {
        signAsync: jest.fn(),
    };
    const bcryptCompareSpy = jest.spyOn(EncryptPasswordHelper, 'bcryptCompare');

    const loginUserDTO = TestUtilsCommon.loginUserDataDTO();

    const TEST_TOKEN = 'any_token';

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthTestModule],
            providers: [
                LoginUserService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        loginUserService = module.get<LoginUserService>(LoginUserService);
        userRepository = module.get(UserRepository);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        Object.values(mockUserRepository).forEach((mockedMethod) =>
            mockedMethod.mockReset(),
        );

        mockJwtService.signAsync.mockReset();

        bcryptCompareSpy.mockReset();
    });

    it('should be defined', () => {
        expect(loginUserService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(mockUserRepository).toBeDefined();
        expect(mockedUser).toBeDefined();
        expect(loginUserDTO).toBeDefined();
    });

    it('should login with a valid user', async () => {
        mockUserRepository.findByEmail.mockResolvedValue(mockedUser);

        mockJwtService.signAsync.mockResolvedValue(TEST_TOKEN);

        const loginUser = await loginUserService.execute(loginUserDTO);

        expect(loginUser).toEqual(<TokenType>{
            token: TEST_TOKEN,
        });

        expect(userRepository.findByEmail).toHaveBeenCalledWith(
            loginUserDTO.email,
        );

        expect(bcryptCompareSpy).toHaveBeenCalledWith(
            loginUserDTO.password,
            mockedUser.password,
        );
    });

    it('should NOT login with a user if the user email is invalid', async () => {
        await expect(loginUserService.execute(loginUserDTO)).rejects.toThrow(
            new InvalidCredentialsException(),
        );

        expect(userRepository.findByEmail).toHaveBeenCalledWith(
            loginUserDTO.email,
        );

        expect(bcryptCompareSpy).toHaveBeenCalledTimes(0);
    });

    it('should NOT login with a user if the user password is invalid', async () => {
        mockUserRepository.findByEmail.mockResolvedValue(mockedUser);

        bcryptCompareSpy.mockResolvedValue(false);

        await expect(loginUserService.execute(loginUserDTO)).rejects.toThrow(
            new InvalidCredentialsException(),
        );

        expect(userRepository.findByEmail).toHaveBeenCalledWith(
            loginUserDTO.email,
        );

        expect(bcryptCompareSpy).toHaveBeenCalledWith(
            loginUserDTO.password,
            mockedUser.password,
        );
    });
});
