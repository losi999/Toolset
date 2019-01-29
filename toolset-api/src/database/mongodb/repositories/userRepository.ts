import UserModel, { User } from './../../../models/schemas/user';
import { IUserRepository } from '../../../interfaces';

export default class UserRepository implements IUserRepository {
    public async createUser(user: User): Promise<void> {
        await UserModel.create(user);  
    }

    public getUserByUsername(username: string): Promise<User | null> {
        return UserModel.findOne({
            username: username
        }).exec();
    }
}