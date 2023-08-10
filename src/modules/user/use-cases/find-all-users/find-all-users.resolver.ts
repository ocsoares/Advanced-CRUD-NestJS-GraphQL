import { Query, Resolver } from '@nestjs/graphql';
import { IResolver } from 'src/interfaces/IResolver';
import { FindAllUsersService } from './find-all-users.service';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';

@Resolver()
export class FindAllUsersResolver implements IResolver {
    constructor(private readonly findAllUsersService: FindAllUsersService) {}

    @UseGuards(JwtAuthGuard)
    @Query(() => [UserEntity], { name: 'findAllUsers' })
    async handle(): Promise<UserEntity[]> {
        const findAllUsers = await this.findAllUsersService.execute();

        return findAllUsers;
    }
}
