import { User } from '@/models/entities/user';

export interface UserRepository {
    createUser(user: User): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
}

export interface UnitOfWork {
    user: UserRepository;
}
