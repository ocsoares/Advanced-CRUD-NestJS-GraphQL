import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsByNameException extends BadRequestException {
    constructor() {
        super('Already exists a user registered with this name !');
    }
}
