import { User } from "./models/schemas/user";

export interface IUserRepository {
    createUser(user: User): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
}

export interface IUnitOfWork {
    user: IUserRepository;
}