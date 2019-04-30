import { DynamoDB } from 'aws-sdk';
import { UserRepository } from '@/models/types/interfaces';
import { User } from '@/models/entities/user';

export default class DynamoUserRepository implements UserRepository {
    constructor(private dynamoDb: DynamoDB.DocumentClient) { }

    public async createUser(user: User): Promise<void> {
        await this.dynamoDb.put({
            TableName: 'Users',
            Item: user,
            ConditionExpression: 'attribute_not_exists(username)',
        }).promise();
    }

    public async getUserByUsername(username: string): Promise<User | null> {
        const users = (await this.dynamoDb.query({
            TableName: 'Users',
            KeyConditionExpression: 'username = :value',
            ExpressionAttributeValues: {
                ':value': username,
            },
        }).promise()).Items || [];

        return users[0] as User;
    }

}
