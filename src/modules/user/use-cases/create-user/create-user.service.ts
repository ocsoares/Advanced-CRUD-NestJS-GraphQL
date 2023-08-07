import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { UserAlreadyExistsByNameException } from 'src/exceptions/user-exceptions/user-already-exists-by-name.exception';
import { UserAlreadyExistsByEmailException } from 'src/exceptions/user-exceptions/user-already-exists-by-email.exception';
import { ErrorCreatingUserException } from 'src/exceptions/user-exceptions/error-creating-user.exception';

@Injectable()
export class CreateUserService implements IService {
    constructor(private readonly createUserRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserEntity> {
        const userAlreadyExists = await this.createUserRepository.findByName(
            data.name,
        );

        if (userAlreadyExists) {
            throw new UserAlreadyExistsByNameException();
        }

        const emailAlreadyExists = await this.createUserRepository.findByEmail(
            data.email,
        );

        if (emailAlreadyExists) {
            throw new UserAlreadyExistsByEmailException();
        }

        const createdUser = await this.createUserRepository.create({
            name: data.name,
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
        });

        console.log(createdUser);

        if (!createdUser) {
            throw new ErrorCreatingUserException();
        }

        return createdUser;
    }
}
