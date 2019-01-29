import { IUserRepository } from "../../../interfaces";
import { User } from "../../../models/schemas/user";

export default class UserRepository implements IUserRepository {
    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }


}