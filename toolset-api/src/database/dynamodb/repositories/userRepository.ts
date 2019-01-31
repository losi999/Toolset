import { IUserRepository } from "../../../interfaces";
import { User } from "../../../models/entities/user";

export default class UserRepository implements IUserRepository {
    async createUser(user: User): Promise<void> {

    }
    async getUserByUsername(username: string): Promise<User | null> {
        return null;
    }


}