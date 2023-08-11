import { Test, TestingModule } from '@nestjs/testing';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { LoginUserResolver } from './login-user.resolver';
import { LoginUserService } from './login-user.service';
import { TokenType } from 'src/graphql/types/token.type';
import { LoginUserDTO } from './dtos/LoginUserDTO';

describe('LoginUserResolver', () => {
    let loginUserResolver: LoginUserResolver;
    let loginUserService: LoginUserService;

    const mockLoginUserService = TestUtilsCommon.mockService();

    const loginUserDTO = TestUtilsCommon.loginUserDataDTO();

    const TEST_TOKEN: TokenType = {
        token: 'any_token',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoginUserResolver,
                {
                    provide: LoginUserService,
                    useValue: mockLoginUserService,
                },
            ],
        }).compile();

        loginUserResolver = module.get<LoginUserResolver>(LoginUserResolver);
        loginUserService = module.get<LoginUserService>(LoginUserService);
    });

    afterEach(() => {
        mockLoginUserService.execute.mockReset();
    });

    it('should be defined', () => {
        expect(loginUserResolver).toBeDefined();
        expect(loginUserService).toBeDefined();
        expect(mockLoginUserService).toBeDefined();
    });

    it('should login with a valid user', async () => {
        mockLoginUserService.execute.mockResolvedValue(TEST_TOKEN);

        const loginUser = await loginUserResolver.handle(loginUserDTO);

        expect(loginUser).toEqual(TEST_TOKEN);
        expect(loginUserService.execute).toHaveBeenCalledWith(loginUserDTO);
    });

    it('should NOT login with a user if the DTO is invalid', async () => {
        const wrongLoginUserDTO = new LoginUserDTO();

        wrongLoginUserDTO.email = 'wrongemail@@@@wrong__.com';
        wrongLoginUserDTO.password = 85632 as any;

        const errorsDTO = await validate(wrongLoginUserDTO);

        mockLoginUserService.execute.mockRejectedValue(
            new BadRequestException(),
        );

        expect(errorsDTO.length).toEqual(2);

        await expect(
            loginUserResolver.handle(wrongLoginUserDTO),
        ).rejects.toThrow(new BadRequestException());

        expect(loginUserService.execute).toHaveBeenCalledWith(
            wrongLoginUserDTO,
        );
    });

    it('should NOT login with a user if the DTO is missing fields', async () => {
        const wrongLoginUserDTO = new LoginUserDTO();

        wrongLoginUserDTO.email = '';
        wrongLoginUserDTO.password = '';

        const errorsDTO = await validate(wrongLoginUserDTO);

        mockLoginUserService.execute.mockRejectedValue(
            new BadRequestException(),
        );

        expect(errorsDTO.length).toEqual(2);

        await expect(
            loginUserResolver.handle(wrongLoginUserDTO),
        ).rejects.toThrow(new BadRequestException());

        expect(loginUserService.execute).toHaveBeenCalledWith(
            wrongLoginUserDTO,
        );
    });
});
