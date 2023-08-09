import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UserNotFoundException } from 'src/exceptions/user-exceptions/user-not-found.exception';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { ErrorUpdatingUserException } from 'src/exceptions/user-exceptions/error-updating-user.exception';
import { EncryptPasswordHelper } from 'src/helpers/encrypt-password.helper';

@Injectable()
export class UpdateUserService implements IService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UserNotFoundException();
        }

        if (data.password) {
            if (data.password !== user.password) {
                data.password = await EncryptPasswordHelper.bcryptEncrypt(
                    data.password,
                    10,
                );
            }
        }

        const updatedUser = await this.userRepository.updateOneById(id, data);

        if (!updatedUser) {
            throw new ErrorUpdatingUserException();
        }

        return updatedUser;
    }
}
