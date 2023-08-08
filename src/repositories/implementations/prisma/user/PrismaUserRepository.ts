import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/abstracts/UserRepository';
import { PrismaService } from '../prisma-client.service';
import { UserEntity } from 'src/graphql/entities/user.entity';
import { CreateUserDTO } from 'src/modules/user/use-cases/create-user/dtos/CreateUserDTO';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: CreateUserDTO): Promise<UserEntity> {
        const createUser = await this.prismaService.user.create({ data });

        return createUser;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const findByEmail = await this.prismaService.user.findUnique({
            where: { email },
        });

        return findByEmail;
    }

    async findById(id: string): Promise<UserEntity> {
        const findById = await this.prismaService.user.findUnique({
            where: { id },
        });

        return findById;
    }

    async findByName(name: string): Promise<UserEntity> {
        const findByName = await this.prismaService.user.findUnique({
            where: { name },
        });

        return findByName;
    }

    async findAll(): Promise<UserEntity[]> {
        const findAll = await this.prismaService.user.findMany();

        return findAll;
    }

    async deleteOneById(id: string): Promise<UserEntity> {
        const deleteUser = await this.prismaService.user.delete({
            where: {
                id,
            },
        });

        return deleteUser;
    }
}
