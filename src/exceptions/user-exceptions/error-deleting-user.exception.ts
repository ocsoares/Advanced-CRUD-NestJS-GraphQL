import { InternalServerErrorException } from '@nestjs/common';

export class ErrorDeletingException extends InternalServerErrorException {
    constructor() {
        super('Error deleting user !');
    }
}
