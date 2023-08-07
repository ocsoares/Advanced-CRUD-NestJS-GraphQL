import { UserEntity } from 'src/graphql/entities/user.entity';
import { CreateUserDTO } from 'src/modules/user/use-cases/create-user/dtos/CreateUserDTO';

export abstract class UserRepository {
    abstract create(data: CreateUserDTO): Promise<UserEntity>;
    abstract findById(id: string): Promise<UserEntity>;
    abstract findByName(name: string): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity>;
    abstract findAll(): Promise<UserEntity[]>;
}
