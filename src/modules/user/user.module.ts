import { Module } from '@nestjs/common';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { LoginUserService } from './use-cases/login-user/login-user.service';
import { CreateUserResolver } from './use-cases/create-user/create-user.resolver';
import { FindAllUsersService } from './use-cases/find-all-users/find-all-users.service';
import { FindAllUsersResolver } from './use-cases/find-all-users/find-all-users.resolver';
import { AuthModule } from '../auth/auth.module';
import { LoginUserResolver } from './use-cases/login-user/login-user.resolver';
import { FindUserService } from './use-cases/find-user/find-user.service';
import { FindUserResolver } from './use-cases/find-user/find-user.resolver';
import { DeleteUserService } from './use-cases/delete-user/delete-user.service';
import { DeleteUserResolver } from './use-cases/delete-user/delete-user.resolver';

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [
        CreateUserService,
        CreateUserResolver,
        FindAllUsersService,
        FindAllUsersResolver,
        LoginUserService,
        LoginUserResolver,
        FindUserService,
        FindUserResolver,
        DeleteUserService,
        DeleteUserResolver,
    ],
})
export class UserModule {}
