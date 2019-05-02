import 'reflect-metadata';
import { User } from '@/models/entities/user';
import MongoUserRepository from '@/database/mongodb/repositories/mongoUserRepository';
import { UserDocument } from '@/database/mongodb/models/userModel';
import { Model } from 'mongoose';

describe('DynamoDB User Repository', () => {
    let repository: MongoUserRepository;
    let mockUserModel: Model<UserDocument, {}>;
    let mockDbCreate: jest.Mock;
    let mockDbFindOne: jest.Mock;

    beforeEach(() => {
        mockDbCreate = jest.fn();
        mockDbFindOne = jest.fn();

        mockUserModel = new (jest.fn<Partial<Model<UserDocument, {}>>, undefined[]>(() => ({
            create: mockDbCreate,
            findOne: mockDbFindOne,
        })))() as Model<UserDocument, {}>;

        repository = new MongoUserRepository(mockUserModel);
    });

    describe('Create user', () => {
        it('should create user', async () => {
            const user = {
                username: 'user123',
                password: 'encryptedPassword',
            } as User;

            mockDbCreate.mockResolvedValue({});

            await repository.createUser(user);
            expect(mockDbCreate).toHaveBeenCalledWith(user);
        });
    });

    describe('Get user by username', () => {
        it('should return the queried user', async () => {
            const username = 'user123';

            const queriedUser = {
                username: 'user123',
                password: 'encryptedPassword',
            } as User;

            mockDbFindOne.mockReturnValue({
                exec(): Promise<User> {
                    return Promise.resolve(queriedUser);
                },
            });

            const result = await repository.getUserByUsername(username);
            expect(result).toEqual(queriedUser);
            expect(mockDbFindOne).toHaveBeenCalledWith({
                username,
            });
        });
    });
});
