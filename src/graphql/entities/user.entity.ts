import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
    @Field(() => ID)
    id: string;

    // O GraphQL CLI Plugin vai colocar o "Field" AUTOMATICAMENTE para o resto dos Campos que
    // NÃO forem do tipo "ID", de acordo com o seu Tipo, ex. "string" !!
    name: string;

    email: string;

    password: string;
}
