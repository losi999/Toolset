import 'reflect-metadata';
import AjvSchemaValidatorService from '@/services/ajvSchemaValidatorService';
import { Ajv } from 'ajv';

describe('Ajv schema validator', () => {
    let service: AjvSchemaValidatorService;
    let mockAjv: Ajv;
    let mockValidate: jest.Mock;
    let mockErrorsText: jest.Mock;

    beforeEach(() => {
        mockValidate = jest.fn();
        mockErrorsText = jest.fn();
        mockAjv = new (jest.fn<Partial<Ajv>, undefined[]>(() => ({
            validate: mockValidate,
            errorsText: mockErrorsText,
        })))() as Ajv;

        service = new AjvSchemaValidatorService(mockAjv);
    });

    it('should return undefined if body is valid', () => {
        mockValidate.mockReturnValue(true);

        const result = service.validate({}, {});
        expect(result).toBeUndefined();
    });

    it('should return with errors if body is invalid', () => {
        mockValidate.mockReturnValue(false);

        const validationError = 'some validation error message';
        mockErrorsText.mockReturnValue(validationError);

        const result = service.validate({}, {});
        expect(result).toEqual(validationError);
    });
});
