import { User } from '@/models/entities/user';
import { TokenClaims } from '@/models/types/types';
import { Comment } from '@/models/entities/comment';

export interface UserRepository {
    createUser(user: User): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
}

export interface CommentRepository {
    createComment(comment: Comment): Promise<void>;
    listComments(parentId: number): Promise<Comment[]>;
}

export interface UnitOfWork {
    user: UserRepository;
    comment: CommentRepository;
}

export interface PasswordService {
    checkPassword(plainPassword: string, encryptedPassword: string): boolean;
    encryptPassword(plainPassword: string): string;
}

export interface TokenService {
    generateToken(claims: TokenClaims): string;
    verifyToken(token: string): TokenClaims;
}

export interface SchemaValidatorService {
    validate(schema: object, data: object): string | undefined;
}
