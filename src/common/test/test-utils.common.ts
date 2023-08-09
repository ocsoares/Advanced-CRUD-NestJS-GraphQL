import { UserEntity } from '../../graphql/entities/user.entity';
import { EncryptPasswordHelper } from '../..//helpers/encrypt-password.helper';
import { CreateUserDTO } from '../..//modules/user/use-cases/create-user/dtos/CreateUserDTO';

const TEST_UTILS_NAME = 'Test Utils';
const TEST_UTILS_EMAIL = 'test_utils@gmail.com';
const TEST_UTILS_PASSWORD = 'test-utils123';

export class TestUtilsCommon {
    static userDataDTO(): CreateUserDTO {
        const user: CreateUserDTO = {
            name: TEST_UTILS_NAME,
            email: TEST_UTILS_EMAIL,
            password: TEST_UTILS_PASSWORD,
        };

        return user;
    }

    static async newUser(withPassword: boolean): Promise<UserEntity> {
        if (withPassword) {
            const user: UserEntity = {
                id: '09ea1b10-a376-4fe6-b873-e7d1048f4e08',
                name: TEST_UTILS_NAME,
                email: TEST_UTILS_EMAIL,
                password: await EncryptPasswordHelper.bcryptEncrypt(
                    TEST_UTILS_PASSWORD,
                    10,
                ),
            };

            return user;
        }

        const userWithoutPassword = new UserEntity();

        userWithoutPassword.name = TEST_UTILS_NAME;
        userWithoutPassword.password = TEST_UTILS_PASSWORD; // NÃO SEI SE ISSO TEM Q SER CRIPTOGRAFADO...

        return userWithoutPassword;
    }
}
