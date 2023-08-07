import { Module } from '@nestjs/common';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { LoginUserController } from './use-cases/login-user/login-user.controller';
import { LoginUserService } from './use-cases/login-user/login-user.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserResolver } from './use-cases/create-user/create-user.resolver';
import { FindAllUsersService } from './use-cases/find-all-users/find-all-users.service';
import { FindAllUsersResolver } from './use-cases/find-all-users/find-all-users.resolver';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
        }),
    ],
    controllers: [LoginUserController],
    providers: [
        CreateUserService,
        LoginUserService,
        CreateUserResolver,
        FindAllUsersService,
        FindAllUsersResolver,
    ],
})
export class UserModule {}
