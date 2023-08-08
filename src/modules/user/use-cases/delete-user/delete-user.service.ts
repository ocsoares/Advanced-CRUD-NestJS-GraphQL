import { Injectable } from '@nestjs/common';
import { ErrorDeletingException } from 'src/exceptions/user-exceptions/error-deleting-user.exception';
import { UserNotFoundException } from 'src/exceptions/user-exceptions/user-not-found.exception';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';

@Injectable()
export class DeleteUserService implements IService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<boolean> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UserNotFoundException();
        }

        const deletedUser = await this.userRepository.deleteOneById(id);

        if (!deletedUser) {
            throw new ErrorDeletingException();
        }

        return true;
    }
}
