import UserModel, { User } from './../models/schemas/user';

export default class UserRepository {
    public async createUser(user: User): Promise<void> {
        await UserModel.create(user);
    }

    public getUserByUsername(username: string): Promise<User | null> {
        return UserModel.findOne({
            username: username
        }).exec();
    }
}