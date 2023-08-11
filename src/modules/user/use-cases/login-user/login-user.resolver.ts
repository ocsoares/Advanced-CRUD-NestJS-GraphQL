import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IResolver } from '../../../../interfaces/IResolver';
import { LoginUserService } from './login-user.service';
import { TokenType } from '../../../../graphql/types/token.type';
import { LoginUserDTO } from './dtos/LoginUserDTO';

@Resolver()
export class LoginUserResolver implements IResolver {
    constructor(private readonly loginUserService: LoginUserService) {}

    @Mutation(() => TokenType, { name: 'loginUser' })
    async handle(@Args('body') body: LoginUserDTO): Promise<TokenType> {
        const loginUser = await this.loginUserService.execute(body);

        return {
            token: loginUser.token,
        };
    }
}
