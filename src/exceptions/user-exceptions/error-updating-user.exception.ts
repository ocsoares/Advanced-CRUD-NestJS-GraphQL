import { InternalServerErrorException } from '@nestjs/common';

export class ErrorUpdatingUserException extends InternalServerErrorException {
    constructor() {
        super('Error updating user !');
    }
}
