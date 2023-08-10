import { InternalServerErrorException } from '@nestjs/common';

export class ErrorDeletingUserException extends InternalServerErrorException {
    constructor() {
        super('Error deleting user !');
    }
}
