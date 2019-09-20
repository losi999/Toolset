import { CommentRepository } from '@/models/types/interfaces';
import { Model } from 'mongoose';
import { CommentDocument } from '@/database/mongodb/models/commentModel';
import { Comment } from '@/models/entities/comment';

export default class MongoCommentRepository implements CommentRepository {
    constructor(private commentModel: Model<CommentDocument, {}>) { }

    public async createComment(comment: Comment): Promise<void> {
        await this.commentModel.create(comment);
    }

    public listComments(parentId: number): Promise<Comment[]> {
        return this.commentModel.find({
            parentId,
        }).populate('postedBy').exec();
    }
}
