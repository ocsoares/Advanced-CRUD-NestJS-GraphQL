import { Module } from '@nestjs/common';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { LoginUserService } from './use-cases/login-user/login-user.service';
import { CreateUserResolver } from './use-cases/create-user/create-user.resolver';
import { FindAllUsersService } from './use-cases/find-all-users/find-all-users.service';
import { FindAllUsersResolver } from './use-cases/find-all-users/find-all-users.resolver';
import { AuthModule } from '../auth/auth.module';
import { LoginUserResolver } from './use-cases/login-user/login-user.resolver';

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
    ],
})
export class UserModule {}
