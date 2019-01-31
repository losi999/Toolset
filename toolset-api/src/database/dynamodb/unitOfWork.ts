import { IUnitOfWork } from "../../interfaces";
import { injectable } from 'inversify';
import UserRepository from "./repositories/userRepository";

@injectable()
export default class UnitOfWork implements IUnitOfWork {
    constructor() {
        console.log(`"Connected" to DynamoDB: ${process.env.DYNAMO_URL}`)
        this.user = new UserRepository();
    }

    public user: UserRepository;
}