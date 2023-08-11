import { Test, TestingModule } from '@nestjs/testing';
import { TestUtilsCommon } from '../../../../common/test/test-utils.common';
import { MeUserService } from './me-user.service';
import { MeUserResolver } from './me-user.resolver';
import { UserEntity } from 'src/graphql/entities/user.entity';

describe('MeUserResolver', () => {
    let meUserResolver: MeUserResolver;
    let meUserService: MeUserService;
    let mockedUser: UserEntity;

    const mockMeUserService = TestUtilsCommon.mockService();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MeUserResolver,
                {
                    provide: MeUserService,
                    useValue: mockMeUserService,
                },
            ],
        }).compile();

        meUserResolver = module.get<MeUserResolver>(MeUserResolver);
        meUserService = module.get<MeUserService>(MeUserService);

        mockedUser = await TestUtilsCommon.newUser(true);
    });

    afterEach(() => {
        mockMeUserService.execute.mockReset();
    });

    it('should be defined', () => {
        expect(meUserResolver).toBeDefined();
        expect(meUserService).toBeDefined();
        expect(mockMeUserService).toBeDefined();
    });

    it('should show the logged user', async () => {
        mockMeUserService.execute.mockResolvedValue(mockedUser);

        const meUser = await meUserResolver.handle(mockedUser);

        expect(meUser).toEqual(mockedUser);
        expect(meUserService.execute).toHaveBeenCalledWith(mockedUser.id);
    });
});
