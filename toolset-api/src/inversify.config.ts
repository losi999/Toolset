import { Container } from 'inversify';
import DynamoUnitOfWork from '@/database/dynamodb/dynamoUnitOfWork';
import MongoUnitOfWork from '@/database/mongodb/mongoUnitOfWork';
import { UnitOfWork, PasswordService, TokenService } from '@/models/types/interfaces';
import ajv, { Ajv } from 'ajv';
import BcryptPasswordService from '@/services/bcryptPasswordService';
import JwtTokenService from './services/jwtTokenService';

const unitOfWorks: { [key: string]: () => UnitOfWork } = {
    mongodb: () => new MongoUnitOfWork(),
    dynamodb: () => new DynamoUnitOfWork(),
};

export const INJECTABLES = {
    unitOfWork: 'unitOfWork',
    ajv: 'ajv',
    passwordService: 'passwordService',
    tokenService: 'tokenService',
};

const container = new Container({ autoBindInjectable: true });
container.bind<UnitOfWork>(INJECTABLES.unitOfWork).toDynamicValue(() => unitOfWorks[process.env.DB_TYPE || '']()).inSingletonScope();
container.bind<Ajv>(INJECTABLES.ajv).toDynamicValue(() => new ajv({ allErrors: true })).inSingletonScope();
container.bind<PasswordService>(INJECTABLES.passwordService).toDynamicValue(() => new BcryptPasswordService()).inSingletonScope();
container.bind<TokenService>(INJECTABLES.tokenService).toDynamicValue(() => new JwtTokenService()).inSingletonScope();

export default container;
