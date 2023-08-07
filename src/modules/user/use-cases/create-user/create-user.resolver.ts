import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserService } from './create-user.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { IResolver } from 'src/interfaces/IResolver';
import { UserEntity } from 'src/graphql/entities/user.entity';

@Resolver()
export class CreateUserResolver implements IResolver {
    constructor(private readonly createUserService: CreateUserService) {}

    // Criar, Alterar ou Manipular DADOS no Banco de Dados = Usar Mutation !!!
    @Mutation(() => UserEntity, { name: 'createUser' })
    async handle(@Args('body') body: CreateUserDTO): Promise<UserEntity> {
        const createdUser = await this.createUserService.execute(body);

        return createdUser;
    }
}
