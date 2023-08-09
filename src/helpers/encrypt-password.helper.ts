import * as bcrypt from 'bcrypt';

export class EncryptPasswordHelper {
    static async bcryptEncrypt(
        password: string,
        salt: number,
    ): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    static async bcryptCompare(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        const isValidPassword = await bcrypt.compare(
            plainPassword,
            hashedPassword,
        );

        return isValidPassword;
    }
}
