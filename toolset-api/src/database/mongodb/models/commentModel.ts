import { Comment } from '@/models/entities/comment';
import { Document, Schema } from 'mongoose';

export type CommentDocument = Comment & Document;

export const CommentSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        postedBy: {
            type: String,
            required: true,
            ref: 'users',
        },
        parentId: {
            type: Number,
            required: true,
        }, 
        postedAt: {
            type: Date,
            required: true,
        },
    },
    {
        toObject: {
            transform: (doc) => {
                console.log(doc);
                return {
                    foo: 'bar',
                };
            },
        }
    }
);
