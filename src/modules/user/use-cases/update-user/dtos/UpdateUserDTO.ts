import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDTO } from '../../create-user/dtos/CreateUserDTO';

@InputType()
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
