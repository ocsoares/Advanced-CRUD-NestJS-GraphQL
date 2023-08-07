import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsByEmailException extends BadRequestException {
    constructor() {
        super('Already exists a user registered with this email !');
    }
}
