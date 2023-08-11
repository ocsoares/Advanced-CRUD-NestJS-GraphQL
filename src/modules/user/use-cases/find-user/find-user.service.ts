import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../../../exceptions/user-exceptions/user-not-found.exception';
import { UserEntity } from '../../../../graphql/entities/user.entity';
import { IService } from '../../../../interfaces/IService';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';

@Injectable()
export class FindUserService implements IService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UserNotFoundException();
        }

        return user;
    }
}
