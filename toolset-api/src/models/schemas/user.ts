import { Document, model, Schema } from 'mongoose';

export interface User {
    username: string;
    password: string;
    displayName: string;
    role: string;
}

interface UserDocument extends User, Document { }

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
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
            default: 'user'
        }
    },
    {
        toObject: {
            transform: (doc): User => {
                return {
                    username: doc.username,
                    password: doc.password,
                    displayName: doc.displayName,
                    role: doc.role
                };
            },
        },
    });

const UserModel = model<UserDocument>('users', UserSchema);

export default UserModel;
