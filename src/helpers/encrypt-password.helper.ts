import * as bcrypt from 'bcrypt';

export class EncryptPasswordHelper {
    static async bcrypt(password: string, salt: number): Promise<string> {
        const hashPassword = await bcrypt.hash(password, salt);

        return hashPassword;
    }
}
