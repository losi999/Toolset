import { Document, model, Schema } from 'mongoose';
import { UserRepository } from '@/models/types/interfaces';
import { User } from '@/models/entities/user';

interface UserDocument extends User, Document { }

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: 'user',
        },
    },
    {
        toObject: {
            transform: (doc): User => {
                return {
                    username: doc.username,
                    password: doc.password,
                    displayName: doc.displayName,
                    role: doc.role,
                };
            },
        },
    });

const UserModel = model<UserDocument>('users', UserSchema);

export default class MongoUserRepository implements UserRepository {
    public async createUser(user: User): Promise<void> {
        await UserModel.create(user);
    }

    public getUserByUsername(username: string): Promise<User | null> {
        return UserModel.findOne({
            username,
        }).exec();
    }
}
