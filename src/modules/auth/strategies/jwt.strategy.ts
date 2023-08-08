import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';
import { ITokenPayload } from 'src/interfaces/ITokenPayload';
import { UserEntity } from 'src/graphql/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: ITokenPayload): Promise<UserEntity> {
        const user = await this.userRepository.findById(payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
