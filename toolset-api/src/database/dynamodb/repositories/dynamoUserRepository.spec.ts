import 'reflect-metadata';
import DynamoUserRepository from '@/database/dynamodb/repositories/dynamoUserRepository';
import { DynamoDB } from 'aws-sdk';
import { User } from '@/models/entities/user';

describe('DynamoDB User Repository', () => {
    let repository: DynamoUserRepository;
    let mockDbQuery: jest.SpyInstance;
    let mockDbPut: jest.SpyInstance;

    beforeEach(() => {
        const dynamoClient = new DynamoDB.DocumentClient();
        mockDbQuery = jest.spyOn(dynamoClient, 'query');
        mockDbPut = jest.spyOn(dynamoClient, 'put');

        repository = new DynamoUserRepository(dynamoClient);
    });

    describe('Create user', () => {
        it('should create user', async () => {
            const user = {
                username: 'user123',
                password: 'encryptedPassword',
            } as User;

            mockDbPut.mockReturnValue({
                promise(): Promise<void> {
                    return Promise.resolve();
                },
            });

            await repository.createUser(user);
            expect(mockDbPut).toHaveBeenCalledWith({
                TableName: 'Users',
                Item: user,
                ConditionExpression: 'attribute_not_exists(username)',
            });
        });
    });

    describe('Get user by username', () => {
        it('should return the queried user', async () => {
            const username = 'user123';

            const queriedUser = {
                username: 'user123',
                password: 'encryptedPassword',
            } as User;

            mockDbQuery.mockReturnValue({
                promise(): Promise<any> {
                    return Promise.resolve({
                        Items: [queriedUser],
                    });
                },
            });

            const result = await repository.getUserByUsername(username);
            expect(result).toEqual(queriedUser);
            expect(mockDbQuery).toHaveBeenCalledWith({
                TableName: 'Users',
                KeyConditionExpression: 'username = :value',
                ExpressionAttributeValues: {
                    ':value': username,
                },
            });
        });
    });
});
