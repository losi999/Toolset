import { injectable, inject } from 'inversify';
import { INJECTABLES } from '@/models/types/types';
import { UnitOfWork } from '@/models/types/interfaces';
import { ControllerActionType, CommentBody } from '@/models/types/controllerRequest';
import { BadRequestResponse, OkResponse, ListActorsResponse, GetActorResponse, ListActorCommentsResponse, InternalServerErrorResponse } from '@/models/types/controllerResponses';
import TvMazeService from '@/services/tvMazeService';

type ActorSearchQuery = {
    name: string;
};

type PathActorId = {
    actorId: number;
};

@injectable()
export default class ActorsController {
    constructor(private tvMazeService: TvMazeService) { }

    public listActors(): ControllerActionType<ListActorsResponse | BadRequestResponse | InternalServerErrorResponse, undefined, undefined, ActorSearchQuery> {
        return async (req) => {
            const hasInvalidQueryParam = Object.keys(req.query).some((q) => !['name'].includes(q));

            if (hasInvalidQueryParam) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'AC001',
                    },
                };
            }

            if (!req.query.name) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'AC002',
                    },
                };
            }

            let actors;
            try {
                actors = await this.tvMazeService.searchActors(req.query.name);
            } catch (error) {
                return {
                    statusCode: 500,
                };
            }

            return {
                statusCode: 200,
                body: actors.map(({ person }) => {
                    return {
                        id: person.id,
                        name: person.name,
                        image: person.image ? person.image.medium : '',
                    };
                }),
            };
        };
    }

    public getActor(): ControllerActionType<GetActorResponse | BadRequestResponse | InternalServerErrorResponse, undefined, PathActorId> {
        return async (req) => {
            if (req.query && Object.keys(req.query).length > 0) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'AC001',
                    },
                };
            }

            if (isNaN(req.params.actorId) || req.params.actorId <= 0) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'AC003',
                    },
                };
            }

            let actor;
            try {
                actor = await this.tvMazeService.actorDetails(req.params.actorId);
            } catch (error) {
                return {
                    statusCode: 500,
                };
            }

            return {
                statusCode: 200,
                body: {
                    id: actor.id,
                    name: actor.name,
                    image: actor.image ? actor.image.medium : '',
                    dateOfBirth: actor.birthday,
                    country: actor.country.name,
                },
            };
        };
    }

    public listActorComments(): ControllerActionType<ListActorCommentsResponse | BadRequestResponse, undefined, PathActorId> {
        return async (req) => {

            return {
                statusCode: 200,
                body: [],
            };
        };
    }

    public createActorComment(): ControllerActionType<OkResponse | BadRequestResponse, CommentBody, PathActorId> {
        return async (req) => {

            return {
                statusCode: 200,
            };
        };
    }
}
