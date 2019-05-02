import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { UnitOfWork, UserRepository } from '@/models/types/interfaces';
import MongoUserRepository from '@/database/mongodb/repositories/mongoUserRepository';
import { UserDocument, UserSchema } from '@/database/mongodb/models/userModel';

@injectable()
export default class MongoUnitOfWork implements UnitOfWork {
    public readonly user: UserRepository;

    constructor() {
        mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`, {
            useCreateIndex: true,
            useNewUrlParser: true,
        }, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`MongoDB connected: ${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`);
            }
        });

        const userModel = mongoose.model<UserDocument>('users', UserSchema);

        this.user = new MongoUserRepository(userModel);
    }
}
