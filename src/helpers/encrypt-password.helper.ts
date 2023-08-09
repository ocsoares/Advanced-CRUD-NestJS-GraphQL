import * as bcrypt from 'bcrypt';

export class EncryptPasswordHelper {
    static async bcrypt(password: string, salt: number): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }
}
