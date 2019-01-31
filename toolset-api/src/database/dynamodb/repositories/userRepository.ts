import { IUserRepository } from "../../../interfaces";
import { User } from "../../../models/entities/user";
import { DynamoDB } from "aws-sdk";

export default class UserRepository implements IUserRepository {
    constructor(private dynamoDb: DynamoDB.DocumentClient) { }

    async createUser(user: User): Promise<void> {
        await this.dynamoDb.put({
            TableName: 'Users',
            Item: user,
            ConditionExpression: 'attribute_not_exists(username)'
        }).promise()
    }
    async getUserByUsername(username: string): Promise<User | null> {
        const users = (await this.dynamoDb.query({
            TableName: 'Users',
            KeyConditionExpression: 'username = :value',
            ExpressionAttributeValues: {
                ':value': username
            }
        }).promise()).Items || [];

        return users[0] as User;
    }


}