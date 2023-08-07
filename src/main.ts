import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/app';
import { Request, Response } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    const server = app.getHttpAdapter();

    server.get('/', (req: Request, res: Response) => {
        res.redirect('/graphql');
    });

    await app.listen(PORT);
}

bootstrap();
