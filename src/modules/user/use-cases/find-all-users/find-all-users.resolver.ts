import { Query, Resolver } from '@nestjs/graphql';
import { IResolver } from 'src/interfaces/IResolver';
import { FindAllUsersService } from './find-all-users.service';
import { UserEntity } from 'src/graphql/entities/user.entity';

@Resolver()
export class FindAllUsersResolver implements IResolver {
    constructor(private readonly findAllUsersService: FindAllUsersService) {}

    @Query(() => [UserEntity], { name: 'findAllUsers' })
    async handle(): Promise<UserEntity[]> {
        const findAllUsers = await this.findAllUsersService.execute();

        return findAllUsers;
    }
}
