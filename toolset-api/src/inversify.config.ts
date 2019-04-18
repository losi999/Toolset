import { Container } from 'inversify';
import DynamoUnitOfWork from '@/database/dynamodb/dynamoUnitOfWork';
import MongoUnitOfWork from '@/database/mongodb/mongoUnitOfWork';
import { UnitOfWork } from '@/interfaces';

const unitOfWorks: any = {
    mongodb: () => new MongoUnitOfWork(),
    dynamodb: () => new DynamoUnitOfWork(),
};

const container = new Container({ autoBindInjectable: true });
container.bind<UnitOfWork>('unitOfWork').toDynamicValue(() => unitOfWorks[process.env.DB_TYPE || '']()).inSingletonScope();

export default container;
