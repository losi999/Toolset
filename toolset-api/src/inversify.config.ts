import { Container } from 'inversify';
import DynamoUnitOfWork from '@/database/dynamodb/dynamoUnitOfWork';
import MongoUnitOfWork from '@/database/mongodb/mongoUnitOfWork';
import { UnitOfWork, PasswordService, TokenService, SchemaValidatorService } from '@/models/types/interfaces';
import ajv, { Ajv } from 'ajv';
import BcryptPasswordService from '@/services/bcryptPasswordService';
import JwtTokenService from '@/services/jwtTokenService';
import AjvSchemaValidatorService from '@/services/ajvSchemaValidatorService';
import { INJECTABLES } from '@/models/types/types';

const unitOfWorks: { [key: string]: any } = {
    mongodb: MongoUnitOfWork,
    dynamodb: DynamoUnitOfWork,
};

const container = new Container({ autoBindInjectable: true });

container.bind<UnitOfWork>(INJECTABLES.unitOfWork).to(unitOfWorks[process.env.DB_TYPE]).inSingletonScope();
container.bind<Ajv>(INJECTABLES.ajv).toDynamicValue(() => new ajv({ allErrors: true })).inSingletonScope();
container.bind<PasswordService>(INJECTABLES.passwordService).to(BcryptPasswordService).inSingletonScope();
container.bind<TokenService>(INJECTABLES.tokenService).to(JwtTokenService).inSingletonScope();
container.bind<SchemaValidatorService>(INJECTABLES.ajvSchemaValidatorService).to(AjvSchemaValidatorService).inSingletonScope();

export default container;
