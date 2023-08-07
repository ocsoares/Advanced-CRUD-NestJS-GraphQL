import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';
import { LoginUserDTO } from './dtos/LoginUserDTO';
import { TokenType } from 'src/graphql/types/token.type';
import { InvalidCredentialsException } from 'src/exceptions/auth-exceptions/invalid-credentials.exception';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

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

        const isValidPassword = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!isValidPassword) {
            throw new InvalidCredentialsException();
        }

        const token = await this.generateToken(user);

        return {
            token,
        };
    }

    private async generateToken(user: UserEntity): Promise<string> {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };

        const generatedToken = await this.jwtService.signAsync(payload);

        return generatedToken;
    }
}
