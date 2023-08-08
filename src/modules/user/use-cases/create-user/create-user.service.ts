import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { UserAlreadyExistsByNameException } from 'src/exceptions/user-exceptions/user-already-exists-by-name.exception';
import { UserAlreadyExistsByEmailException } from 'src/exceptions/user-exceptions/user-already-exists-by-email.exception';
import { ErrorCreatingUserException } from 'src/exceptions/user-exceptions/error-creating-user.exception';
import { EncryptPasswordHelper } from 'src/helpers/encrypt-password.helper';

@Injectable()
export class CreateUserService implements IService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserEntity> {
        const userAlreadyExists = await this.userRepository.findByName(
            data.name,
        );

        if (userAlreadyExists) {
            throw new UserAlreadyExistsByNameException();
        }

        const emailAlreadyExists = await this.userRepository.findByEmail(
            data.email,
        );

        if (emailAlreadyExists) {
            throw new UserAlreadyExistsByEmailException();
        }

        const createdUser = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: await EncryptPasswordHelper.bcrypt(data.password, 10),
        });

        if (!createdUser) {
            throw new ErrorCreatingUserException();
        }

        return createdUser;
    }
}
