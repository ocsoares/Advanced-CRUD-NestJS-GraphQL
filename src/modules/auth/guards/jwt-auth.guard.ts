import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { InvalidTokenException } from '../../../exceptions/auth-exceptions/invalid-token.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req;
    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw new InvalidTokenException();
        }

        return user;
    }
}
