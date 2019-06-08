import { DynamoDB } from 'aws-sdk';
import { injectable } from 'inversify';
import { UnitOfWork } from '@/models/types/interfaces';
import DynamoUserRepository from '@/database/dynamodb/repositories/dynamoUserRepository';

@injectable()
export default class DynamoUnitOfWork implements UnitOfWork {
    public readonly user: DynamoUserRepository;

    constructor() {
        const documentClient = new DynamoDB.DocumentClient({
            endpoint: process.env.DYNAMO_URL,
        });
        console.log(`Connected to DynamoDB: ${process.env.DYNAMO_URL}`);
        this.user = new DynamoUserRepository(documentClient);
    }
}
