import mongoose from 'mongoose';
import { IUnitOfWork, IUserRepository } from "../../interfaces";
import UserRepository from './repositories/userRepository';
import { injectable } from 'inversify';

@injectable()
export default class UnitOfWork implements IUnitOfWork {
    user: IUserRepository;

    constructor() {
        mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`, {
            useCreateIndex: true,
            useNewUrlParser: true
        }, (error) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log(`MongoDB connected: ${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`);
            }
        });

        this.user = new UserRepository();
    }
}