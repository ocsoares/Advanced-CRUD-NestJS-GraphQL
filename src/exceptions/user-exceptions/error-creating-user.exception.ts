import { InternalServerErrorException } from '@nestjs/common';

export class ErrorCreatingUserException extends InternalServerErrorException {
    constructor() {
        super('Error creating user !');
    }
}
