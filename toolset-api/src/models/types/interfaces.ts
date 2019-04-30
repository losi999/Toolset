import { User } from '@/models/entities/user';
import { TokenClaims } from '@/models/types/types';

export interface UserRepository {
    createUser(user: User): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
}

export interface UnitOfWork {
    user: UserRepository;
}

export interface PasswordService {
    checkPassword(plainPassword: string, encryptedPassword: string): boolean;
    encryptPassword(plainPassword: string): string;
}

export interface TokenService {
    generateToken(claims: TokenClaims): string;
    verifyToken(token: string): TokenClaims;
}
