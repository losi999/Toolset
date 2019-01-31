import { IUnitOfWork } from "../../interfaces";
import { injectable } from 'inversify';
import UserRepository from "./repositories/userRepository";
import { DynamoDB } from 'aws-sdk';

@injectable()
export default class UnitOfWork implements IUnitOfWork {
    constructor() {
        const dynamoDb = new DynamoDB.DocumentClient({
            endpoint: process.env.DYNAMO_URL
        })
        console.log(`Connected to DynamoDB: ${process.env.DYNAMO_URL}`)
        this.user = new UserRepository(dynamoDb);
    }

    public user: UserRepository;
}