import { SchemaValidatorService } from '@/models/types/interfaces';
import { injectable, inject } from 'inversify';
import { Ajv } from 'ajv';
import { INJECTABLES } from '@/models/types/types';

@injectable()
export default class AjvSchemaValidatorService implements SchemaValidatorService {
    constructor(
        @inject(INJECTABLES.ajv) private ajv: Ajv,
    ) { }

    public validate(schema: object, data: object): string | undefined {
        const isValid = this.ajv.validate(schema, data);

        if (!isValid) {
            return this.ajv.errorsText();
        }
        return;
    }
}
