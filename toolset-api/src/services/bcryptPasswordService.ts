import { PasswordService } from '@/models/types/interfaces';
import { compareSync, hashSync } from 'bcryptjs';
import { injectable } from 'inversify';

@injectable()
export default class BcryptPasswordService implements PasswordService {
    public checkPassword(plainPassword: string, encryptedPassword: string): boolean {
        return compareSync(plainPassword, encryptedPassword);
    }

    public encryptPassword(plainPassword: string): string {
        return hashSync(plainPassword);
    }
}
