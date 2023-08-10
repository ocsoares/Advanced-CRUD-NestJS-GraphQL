import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserResolver } from './create-user.resolver';
import { CreateUserService } from './create-user.service';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { validate } from 'class-validator';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { BadRequestException } from '@nestjs/common';

describe('CreateUserResolver', () => {
    let createUserResolver: CreateUserResolver;
    let createUserService: CreateUserService;
    let mockedCreatedUser: UserEntity;

    const mockCreateUserService = {
        execute: jest.fn(),
    };

    const createUserDTO = TestUtilsCommon.userDataDTO();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserResolver,
                {
                    provide: CreateUserService,
                    useValue: mockCreateUserService,
                },
            ],
        }).compile();

        createUserResolver = module.get<CreateUserResolver>(CreateUserResolver);
        createUserService = module.get<CreateUserService>(CreateUserService);

        mockedCreatedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        mockCreateUserService.execute.mockReset();
    });

    it('should be defined', () => {
        expect(createUserResolver).toBeDefined();
        expect(createUserService).toBeDefined();
        expect(mockCreateUserService).toBeDefined();
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            mockCreateUserService.execute.mockResolvedValue(mockedCreatedUser);

            const createdUser = await createUserResolver.handle(createUserDTO);

            expect(createdUser).toEqual(mockedCreatedUser);
            expect(createUserService.execute).toHaveBeenCalledWith(
                createUserDTO,
            );
        });

        it('should NOT create a new user if the DTO is invalid', async () => {
            const wrongCreateUserDTO = new CreateUserDTO() as any;

            wrongCreateUserDTO.name = { wrongName: 'Wrong Name' };
            wrongCreateUserDTO.email = 'wrongemail@@@@wrong__.com';
            wrongCreateUserDTO.password = 85632;

            const errorsDTO = await validate(wrongCreateUserDTO);

            mockCreateUserService.execute.mockRejectedValue(
                new BadRequestException(),
            );

            expect(errorsDTO.length).toEqual(3);

            await expect(
                createUserResolver.handle(wrongCreateUserDTO),
            ).rejects.toThrow(new BadRequestException());

            expect(createUserService.execute).toHaveBeenCalledWith(
                wrongCreateUserDTO,
            );
        });

        it('should NOT create a new user if the DTO is missing fields', async () => {
            const wrongCreateUserDTO = new CreateUserDTO();

            wrongCreateUserDTO.name = '';
            wrongCreateUserDTO.email = '';
            wrongCreateUserDTO.password = '';

            const errorsDTO = await validate(wrongCreateUserDTO);

            mockCreateUserService.execute.mockRejectedValue(
                new BadRequestException(),
            );

            expect(errorsDTO.length).toEqual(3);

            await expect(
                createUserResolver.handle(wrongCreateUserDTO),
            ).rejects.toThrow(new BadRequestException());

            expect(createUserService.execute).toHaveBeenCalledWith(
                wrongCreateUserDTO,
            );
        });
    });
});
