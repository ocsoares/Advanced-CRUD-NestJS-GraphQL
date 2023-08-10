import { Test, TestingModule } from '@nestjs/testing';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { DeleteUserResolver } from './delete-user.resolver';
import { DeleteUserService } from './delete-user.service';

describe('DeleteUserResolver', () => {
    let deleteUserResolver: DeleteUserResolver;
    let deleteUserService: DeleteUserService;

    const mockDeleteUserService = TestUtilsCommon.mockService();

    const TEST_ID = 'any_id';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteUserResolver,
                {
                    provide: DeleteUserService,
                    useValue: mockDeleteUserService,
                },
            ],
        }).compile();

        deleteUserResolver = module.get<DeleteUserResolver>(DeleteUserResolver);
        deleteUserService = module.get<DeleteUserService>(DeleteUserService);
    });

    afterEach(() => {
        mockDeleteUserService.execute.mockReset();
    });

    it('should be defined', () => {
        expect(deleteUserResolver).toBeDefined();
        expect(deleteUserService).toBeDefined();
        expect(mockDeleteUserService).toBeDefined();
    });

    it('should delete a user', async () => {
        mockDeleteUserService.execute.mockResolvedValue(true);

        const deletedUser = await deleteUserResolver.handle(TEST_ID);

        expect(deletedUser).toEqual(true);
        expect(deleteUserService.execute).toHaveBeenCalledWith(TEST_ID);
    });
});
