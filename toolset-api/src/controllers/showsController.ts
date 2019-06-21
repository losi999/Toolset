import { injectable, inject } from 'inversify';
import { INJECTABLES, TvMazeTvShowListItem, TvMazeTvShowDetails } from '@/models/types/types';
import { UnitOfWork } from '@/models/types/interfaces';
import { ControllerActionType, CommentBody } from '@/models/types/controllerRequest';
import { BadRequestResponse, ListTvShowsResponse, GetTvShowResponse, ListTvShowCommentsResponse, OkResponse, InternalServerErrorResponse } from '@/models/types/controllerResponses';
import TvMazeService from '@/services/tvMazeService';

type ShowSearchQuery = {
    name: string;
};

type PathShowId = {
    showId: number;
};

@injectable()
export default class ShowsController {
    constructor(private tvMazeService: TvMazeService) { }

    public listTvShows(): ControllerActionType<ListTvShowsResponse | BadRequestResponse | InternalServerErrorResponse, undefined, undefined, ShowSearchQuery> {
        return async (req) => {
            const hasInvalidQueryParam = Object.keys(req.query).some((q) => !['name'].includes(q));

            if (hasInvalidQueryParam) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'SH001',
                    },
                };
            }

            if (!req.query.name) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'SH002',
                    },
                };
            }

            let shows;
            try {
                shows = await this.tvMazeService.searchTvShows(req.query.name);
            } catch (error) {
                return {
                    statusCode: 500,
                };
            }

            return {
                statusCode: 200,
                body: shows.map(({ show }) => {
                    return {
                        id: show.id,
                        name: show.name,
                        image: show.image.medium,
                        genres: [
                            ...show.genres,
                        ],
                    };
                }),
            };
        };
    }

    public getTvShow(): ControllerActionType<GetTvShowResponse | BadRequestResponse | InternalServerErrorResponse, undefined, PathShowId> {
        return async (req) => {
            if (req.query && Object.keys(req.query).length > 0) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'SH001',
                    },
                };
            }

            if (isNaN(req.params.showId) || req.params.showId <= 0) {
                return {
                    statusCode: 400,
                    body: {
                        errorCode: 'SH003',
                    },
                };
            }

            let show;
            try {
                show = await this.tvMazeService.tvShowDetails(req.params.showId);
            } catch (error) {
                return {
                    statusCode: 500,
                };
            }

            return {
                statusCode: 200,
                body: {
                    id: show.id,
                    name: show.name,
                    genres: [
                        ...show.genres,
                    ],
                    image: show.image.medium,
                    summary: show.summary,
                    imdb: `https://www.imdb.com/title/${show.externals.imdb}/`,
                    cast: show._embedded.cast.map((c) => {
                        return {
                            id: c.person.id,
                            name: c.person.name,
                            image: c.person.image.medium,
                            character: c.character.name,
                        };
                    }),
                },
            };
        };
    }

    public listTvShowComments(): ControllerActionType<ListTvShowCommentsResponse | BadRequestResponse, undefined, PathShowId> {
        return async (req) => {

            return {
                statusCode: 200,
                body: [],
            };
        };
    }

    public createTvShowComment(): ControllerActionType<OkResponse | BadRequestResponse, CommentBody, PathShowId> {
        return async (req) => {

            return {
                statusCode: 200,
            };
        };
    }
}
