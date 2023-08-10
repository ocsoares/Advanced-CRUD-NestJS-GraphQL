import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IResolver } from 'src/interfaces/IResolver';
import { DeleteUserService } from './delete-user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';

@Resolver()
export class DeleteUserResolver implements IResolver {
    constructor(private readonly deleteUserService: DeleteUserService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean, { name: 'deleteUser' })
    async handle(@Args('id') id: string): Promise<boolean> {
        const deleteUser = await this.deleteUserService.execute(id);

        return deleteUser;
    }
}
