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
    axios: Symbol('axios'),
};

export type TvMazeTvShowListItem = {
    show: {
        id: number;
        name: string;
        genres: string[],
        image: {
            medium: string;
        }
    };
};

export type TvMazeTvShowDetails = {
    id: number;
    name: string;
    genres: string[],
    image: {
        medium: string;
    },
    summary: string;
    externals: {
        imdb: string;
    };
    _embedded: {
        cast: Array<{
            person: {
                id: number;
                name: string;
                image: {
                    medium: string;
                },
            };
            character: {
                name: string;
            };
        }>;
    };
};

export type TvMazeActorListItem = {
    person: {
        id: number;
        name: string;
        image?: {
            medium: string;
        };
    };
};

export type TvMazeActorDetails = {
    id: number;
    name: string;
    image?: {
        medium: string;
    };
    birthday: string;
    country: {
        name: string;
    };
};
