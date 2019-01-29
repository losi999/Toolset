import { Container } from "inversify";
import { IUnitOfWork } from "./interfaces";
import MongoUnitOfWork from "./database/mongodb/unitOfWork";
import DynamoUnitOfWork from './database/dynamodb/unitOfWork';

const unitOfWorks: any = {
    mongodb: () => new MongoUnitOfWork(),
    dynamodb: () => new DynamoUnitOfWork()
}

const container = new Container({ autoBindInjectable: true });
container.bind<IUnitOfWork>('unitOfWork').toDynamicValue(() => unitOfWorks[process.env.DB_TYPE || '']()).inSingletonScope();;

export default container;