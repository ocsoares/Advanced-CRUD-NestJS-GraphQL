import { Query, Resolver } from '@nestjs/graphql';
import { IResolver } from 'src/interfaces/IResolver';
import { MeUserService } from './me-user.service';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Resolver()
export class MeUserResolver implements IResolver {
    constructor(private readonly meUserService: MeUserService) {}

    @UseGuards(JwtAuthGuard)
    @Query(() => UserEntity, { name: 'meUser' })
    async handle(@CurrentUser() user: UserEntity): Promise<UserEntity> {
        const meUser = await this.meUserService.execute(user.id);

        return meUser;
    }
}
