import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/exceptions/user-exceptions/user-not-found.exception';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';

@Injectable()
export class MeUserService implements IService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(user_id: string): Promise<UserEntity> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new UserNotFoundException();
        }

        return user;
    }
}
