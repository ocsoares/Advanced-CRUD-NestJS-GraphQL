import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';
import { LoginUserDTO } from './dtos/LoginUserDTO';
import { TokenType } from 'src/graphql/types/token.type';
import { InvalidCredentialsException } from 'src/exceptions/auth-exceptions/invalid-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from 'src/interfaces/ITokenPayload';
import { EncryptPasswordHelper } from 'src/helpers/encrypt-password.helper';

@Injectable()
export class LoginUserService implements IService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(data: LoginUserDTO): Promise<TokenType> {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new InvalidCredentialsException();
        }
        const isValidPassword = await EncryptPasswordHelper.bcryptCompare(
            data.password,
            user.password,
        );

        if (!isValidPassword) {
            throw new InvalidCredentialsException();
        }

        const token = await this.generateToken({
            sub: user.id,
            name: user.name,
            email: user.email,
        });

        return {
            token,
        };
    }

    private async generateToken(payload: ITokenPayload): Promise<string> {
        const generatedToken = await this.jwtService.signAsync(payload);

        return generatedToken;
    }
}
