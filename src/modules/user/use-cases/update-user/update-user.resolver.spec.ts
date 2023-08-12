import { Test, TestingModule } from '@nestjs/testing';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserResolver } from './update-user.resolver';
import { UpdateUserService } from './update-user.service';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';

describe('UpdateUserResolver', () => {
    let updateUserResolver: UpdateUserResolver;
    let updateUserService: UpdateUserService;

    const mockUpdateUserService = TestUtilsCommon.mockService();

    const updatedUser = {
        id: '359bfd57-b4f7-4d3c-b0e4-161aa78cae72',
        name: 'Update User',
        email: 'updateUser@gmail.com',
        password:
            '$2b$10$tkBtExZ46AXwdiI23aYpne2zp9RDlU8dFvBftW0KJ2lPKH8Yb9Vi6',
    };

    const updateUserDTO = TestUtilsCommon.updateUserDataDTO();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserResolver,
                {
                    provide: UpdateUserService,
                    useValue: mockUpdateUserService,
                },
            ],
        }).compile();

        updateUserResolver = module.get<UpdateUserResolver>(UpdateUserResolver);
        updateUserService = module.get<UpdateUserService>(UpdateUserService);
    });

    afterEach(() => {
        mockUpdateUserService.execute.mockReset();
    });

    it('should be defined', () => {
        expect(updateUserResolver).toBeDefined();
        expect(updateUserService).toBeDefined();
        expect(mockUpdateUserService).toBeDefined();
    });

    it('should update a full user', async () => {
        mockUpdateUserService.execute.mockResolvedValue(updatedUser);

        const updateUser = await updateUserResolver.handle(
            updatedUser.id,
            updateUserDTO,
        );

        expect(updateUser).toEqual(updatedUser);
        expect(updateUserService.execute).toHaveBeenCalledWith(
            updatedUser.id,
            updateUserDTO,
        );
    });

    it('should NOT update a user if the DTO is invalid', async () => {
        const wrongUpdateUserDTO = new UpdateUserDTO();

        wrongUpdateUserDTO.name = { wrongName: 'Wrong Name' } as any;
        wrongUpdateUserDTO.email = 'wrongemail@@@@wrong__.com';
        wrongUpdateUserDTO.password = 85632 as any;

        const errorsDTO = await validate(wrongUpdateUserDTO);

        mockUpdateUserService.execute.mockRejectedValue(
            new BadRequestException(),
        );

        expect(errorsDTO.length).toEqual(3);

        await expect(
            updateUserResolver.handle(updatedUser.id, updateUserDTO),
        ).rejects.toThrow(new BadRequestException());

        expect(updateUserService.execute).toHaveBeenCalledWith(
            updatedUser.id,
            updateUserDTO,
        );
    });

    it('should NOT update a user if the DTO is missing fields', async () => {
        const wrongUpdateUserDTO = new UpdateUserDTO();

        wrongUpdateUserDTO.name = '';
        wrongUpdateUserDTO.email = '';
        wrongUpdateUserDTO.password = '';

        const errorsDTO = await validate(wrongUpdateUserDTO);

        mockUpdateUserService.execute.mockRejectedValue(
            new BadRequestException(),
        );

        expect(errorsDTO.length).toEqual(3);

        await expect(
            updateUserResolver.handle(updatedUser.id, updateUserDTO),
        ).rejects.toThrow(new BadRequestException());

        expect(updateUserService.execute).toHaveBeenCalledWith(
            updatedUser.id,
            updateUserDTO,
        );
    });
});
