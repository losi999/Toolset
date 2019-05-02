import { UserRepository } from '@/models/types/interfaces';
import { User } from '@/models/entities/user';
import { Model } from 'mongoose';
import { UserDocument } from '@/database/mongodb/models/userModel';

export default class MongoUserRepository implements UserRepository {
    constructor(private userModel: Model<UserDocument, {}>) { }

    public async createUser(user: User): Promise<void> {
        await this.userModel.create(user);
    }

    public getUserByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({
            username,
        }).exec();
    }
}
