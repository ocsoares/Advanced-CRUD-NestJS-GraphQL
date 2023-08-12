import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IResolver } from '../../../../interfaces/IResolver';
import { UpdateUserService } from './update-user.service';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';

@Resolver()
export class UpdateUserResolver implements IResolver {
    constructor(private readonly updateUserService: UpdateUserService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => UserEntity, { name: 'updateUser' })
    async handle(
        @Args('id') id: string,
        @Args('data') data: UpdateUserDTO,
    ): Promise<UserEntity> {
        const updateUser = await this.updateUserService.execute(id, data);

        return updateUser;
    }
}
