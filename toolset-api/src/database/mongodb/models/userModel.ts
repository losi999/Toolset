import { User } from '@/models/entities/user';
import { Document, Schema } from 'mongoose';

export type UserDocument = User & Document;

export const UserSchema = new Schema(
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
