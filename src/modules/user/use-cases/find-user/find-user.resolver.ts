import { Args, Query, Resolver } from '@nestjs/graphql';
import { IResolver } from 'src/interfaces/IResolver';
import { FindUserService } from './find-user.service';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';

@Resolver()
export class FindUserResolver implements IResolver {
    constructor(private readonly findUserService: FindUserService) {}

    @UseGuards(JwtAuthGuard)
    @Query(() => UserEntity, { name: 'findUser' })
    async handle(@Args('id') id: string): Promise<UserEntity> {
        const findUser = await this.findUserService.execute(id);

        return findUser;
    }
}
