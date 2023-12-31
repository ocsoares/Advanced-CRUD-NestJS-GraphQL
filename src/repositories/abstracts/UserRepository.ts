import { UserEntity } from 'src/graphql/entities/user.entity';
import { CreateUserDTO } from 'src/modules/user/use-cases/create-user/dtos/CreateUserDTO';
import { UpdateUserDTO } from 'src/modules/user/use-cases/update-user/dtos/UpdateUserDTO';

export abstract class UserRepository {
    abstract create(data: CreateUserDTO): Promise<UserEntity>;
    abstract findById(id: string): Promise<UserEntity>;
    abstract findByName(name: string): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity>;
    abstract findAll(): Promise<UserEntity[]>;
    abstract deleteOneById(id: string): Promise<UserEntity>;
    abstract updateOneById(
        id: string,
        data: UpdateUserDTO,
    ): Promise<UserEntity>;
}
