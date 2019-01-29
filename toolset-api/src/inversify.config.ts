import { Container } from "inversify";
import { IUnitOfWork } from "./interfaces";
import MongoUnitOfWork from "./database/mongodb/unitOfWork";
import DynamoUnitOfWork from './database/dynamodb/unitOfWork';

const container = new Container({ autoBindInjectable: true });
container.bind<IUnitOfWork>('unitOfWork').to(DynamoUnitOfWork).inSingletonScope();

export default container;