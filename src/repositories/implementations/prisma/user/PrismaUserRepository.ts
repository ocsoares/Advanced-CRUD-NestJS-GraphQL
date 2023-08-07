import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';
import { PrismaService } from '../prisma-client.service';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { CreateUserDTO } from 'src/modules/user/use-cases/create-user/dtos/CreateUserDTO';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly _prismaService: PrismaService) {}

    async create(data: CreateUserDTO): Promise<UserEntity> {
        const createUser = await this._prismaService.user.create({ data });

        return createUser;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const findByEmail = await this._prismaService.user.findUnique({
            where: { email },
        });

        return findByEmail;
    }

    async findById(id: string): Promise<UserEntity> {
        const findById = await this._prismaService.user.findUnique({
            where: { id },
        });

        return findById;
    }

    async findByName(name: string): Promise<UserEntity> {
        const findByName = await this._prismaService.user.findUnique({
            where: { name },
        });

        return findByName;
    }

    async findAll(): Promise<UserEntity[]> {
        const findAll = await this._prismaService.user.findMany();

        return findAll;
    }
}
