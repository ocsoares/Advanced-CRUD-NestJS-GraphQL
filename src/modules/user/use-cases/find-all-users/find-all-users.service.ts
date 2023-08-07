import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';

@Injectable()
export class FindAllUsersService implements IService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<UserEntity[]> {
        const findAllUsers = await this.userRepository.findAll();

        return findAllUsers;
    }
}
