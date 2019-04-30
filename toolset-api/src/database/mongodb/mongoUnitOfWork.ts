import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { UnitOfWork, UserRepository } from '@/models/types/interfaces';
import MongoUserRepository from '@/database/mongodb/repositories/mongoUserRepository';

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

        this.user = new MongoUserRepository();
    }
}
