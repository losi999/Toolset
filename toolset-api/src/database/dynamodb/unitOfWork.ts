import { DynamoDB } from 'aws-sdk';
import { injectable } from 'inversify';
import { IUnitOfWork } from '@/interfaces';
import UserRepository from '@/database/dynamodb/repositories/userRepository';

@injectable()
export default class UnitOfWork implements IUnitOfWork {

    public user: UserRepository;
    constructor() {
        const dynamoDb = new DynamoDB.DocumentClient({
            endpoint: process.env.DYNAMO_URL,
        });
        console.log(`Connected to DynamoDB: ${process.env.DYNAMO_URL}`);
        this.user = new UserRepository(dynamoDb);
    }
}
