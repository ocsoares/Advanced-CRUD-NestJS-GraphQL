import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IUser } from 'src/models/IUser';
import { UserRepository } from '../../../../repositories/abstracts/UserRepository';
import { CreateUserService } from './create-user.service';
import * as bcript from 'bcrypt';

describe('CreateUserService', () => {
    let service: CreateUserService;
    let repository: UserRepository;

    const userData: IUser = {
        name: 'Teste',
        email: 'teste@gmail.com',
        password: 'teste23',
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateUserService,
                {
                    provide: UserRepository,
                    useValue: {
                        findByName: jest.fn(),
                        findByEmail: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CreateUserService>(CreateUserService);
        repository = module.get(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    it('should throw BadRequestException if user already exists with findByName method', async () => {
        (repository.findByName as jest.Mock).mockResolvedValue(userData);

        await expect(service.execute(userData)).rejects.toThrow(
            new BadRequestException(
                'Já existe um usuário cadastrado com esse nome !',
            ),
        );

        expect(repository.findByName).toHaveBeenCalledWith(userData.name);
    });

    it('should throw BadRequestException if user already exists with findByEmail method', async () => {
        (repository.findByEmail as jest.Mock).mockResolvedValue(userData);

        await expect(service.execute(userData)).rejects.toThrow(
            new BadRequestException(
                'Já existe um usuário cadastrado com esse email !',
            ),
        );

        expect(repository.findByEmail).toHaveBeenCalledWith(userData.email);
    });

    it('should create a new user', async () => {
        const userData: IUser = {
            name: 'TesteUser',
            email: 'testeuser@gmail.com',
            password: 'testeuser123',
        };

        const repositoryCreateData = {
            ...userData,
            password: await bcript.hash(userData.password, 10),
        };

        const userDataWithoutPassword = {
            name: userData.name,
            email: userData.email,
        };

        (repository.create as jest.Mock).mockResolvedValue(<IUser>{
            ...repositoryCreateData,
        });

        const createUser = await service.execute(userData);

        const isValidEncryptedPassword = await bcript.compare(
            userData.password,
            repositoryCreateData.password,
        );

        expect(createUser).toEqual(userDataWithoutPassword);
        expect(isValidEncryptedPassword).toBe(true);
        expect(repository.create).toHaveBeenCalledWith({
            ...repositoryCreateData,
            password: expect.any(String),
        });
    });
});
