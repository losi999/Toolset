export type TokenClaims = {
    username: string,
    displayName: string,
    role: string,
};

export const INJECTABLES = {
    unitOfWork: Symbol('unitOfWork'),
    ajv: Symbol('ajv'),
    passwordService: Symbol('passwordService'),
    tokenService: Symbol('tokenService'),
    ajvSchemaValidatorService: Symbol('ajvSchemaValidatorService'),
};
