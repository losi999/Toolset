import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { UnitOfWork } from '@/models/types/interfaces';
import MongoUserRepository from '@/database/mongodb/repositories/mongoUserRepository';
import { UserDocument, UserSchema } from '@/database/mongodb/models/userModel';
import MongoCommentRepository from '@/database/mongodb/repositories/mongoCommentRepository';
import { CommentDocument, CommentSchema } from '@/database/mongodb/models/commentModel';

@injectable()
export default class MongoUnitOfWork implements UnitOfWork {
    public readonly user: MongoUserRepository;
    public readonly comment: MongoCommentRepository;

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
        const commentModel = mongoose.model<CommentDocument>('comments', CommentSchema);

        this.user = new MongoUserRepository(userModel);
        this.comment = new MongoCommentRepository(commentModel);
    }
}
