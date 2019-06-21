import 'reflect-metadata';
import TvMazeService from '@/services/tvMazeService';
import ShowsController from '@/controllers/showsController';
import { BadRequestResponse, ListTvShowsResponse, GetTvShowResponse } from '@/models/types/controllerResponses';
import { TvMazeTvShowListItem, TvMazeTvShowDetails } from '@/models/types/types';

describe('Shows controller', () => {
    let mockTvMazeService: TvMazeService;
    let mockSearchTvShows: jest.Mock;
    let mockTvShowDetails: jest.Mock;

    let controller: ShowsController;

    beforeEach(() => {
        mockSearchTvShows = jest.fn();
        mockTvShowDetails = jest.fn();

        mockTvMazeService = new (jest.fn<Partial<TvMazeService>, undefined[]>(() => ({
            searchTvShows: mockSearchTvShows,
            tvShowDetails: mockTvShowDetails,
        })))() as TvMazeService;

        controller = new ShowsController(mockTvMazeService);
    });

    describe('List shows action', () => {
        it('should respond with HTTP 400 if unexpected query parameter is given', async () => {
            const response = await controller.listTvShows()({
                query: {
                    notValid: '',
                } as any,
            }) as BadRequestResponse;

            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toEqual('SH001');
        });

        it('should respond with HTTP 400 if empty value is given for "name" query', async () => {
            const response = await controller.listTvShows()({
                query: {
                    name: '',
                },
            }) as BadRequestResponse;

            expect(response.statusCode).toEqual(400);
            expect(response.body.errorCode).toEqual('SH002');
        });

        it('should respond with HTTP 500 if unable to get reponse from tv maze API', async () => {
            mockSearchTvShows.mockRejectedValue({});

            const response = await controller.listTvShows()({
                query: {
                    name: 'some name',
                },
            });

            expect(response.statusCode).toEqual(500);
        });

        it('should respond with HTTP 200 and a list of shows', async () => {
            const id = 1;
            const name = 'Funny Show';
            const image = 'http://www.image.com';
            const genres = ['genre1', 'genre2'];

            const tvShowsFromTvMaze: TvMazeTvShowListItem[] = [{
                show: {
                    id,
                    name,
                    genres,
                    image: {
                        medium: image,
                    },
                },
            }];

            mockSearchTvShows.mockResolvedValue(tvShowsFromTvMaze);

            const response = await controller.listTvShows()({
                query: {
                    name: 'some name',
                },
            }) as ListTvShowsResponse;

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual([{
                id,
                name,
                image,
                genres,
            }]);
        });
    });

    describe('Get show action', () => {
        it('should respond with HTTP 400 if unexpected query parameter is given', async () => {
            const response = await controller.getTvShow()({
                query: {
                    notValid: '',
                } as any,
            }) as BadRequestResponse;

            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toEqual('SH001');
        });

        it('should respond with HTTP 400 if invalid value is given in path', async () => {
            const response = await controller.getTvShow()({
                params: {
                    showId: -1,
                },
            }) as BadRequestResponse;

            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toEqual('SH003');
        });

        it('should respond with HTTP 500 if unable to get response from tv maze api', async () => {
            mockTvShowDetails.mockRejectedValue({});

            const response = await controller.getTvShow()({
                params: {
                    showId: 123,
                },
            });

            expect(response.statusCode).toEqual(500);
        });

        it('should respond with HTTP 200 and the show', async () => {
            const id = 123;
            const name = 'Funny Show';
            const image = 'http://www.image.com';
            const genres = ['genre1', 'genre2'];
            const summary = 'Show summary';
            const imdb = 'tt012345';
            const characterName = 'Character Name';
            const actorId = 321;
            const actorName = 'John Doe';
            const actorImage = 'http://www.actor.image.com';

            const tvShowFromTvMaze: TvMazeTvShowDetails = {
                id,
                name,
                genres,
                summary,
                image: {
                    medium: image,
                },
                externals: {
                    imdb,
                },
                _embedded: {
                    cast: [{
                        character: {
                            name: characterName,
                        },
                        person: {
                            id: actorId,
                            name: actorName,
                            image: {
                                medium: actorImage,
                            },
                        },
                    }]
                }
            };

            mockTvShowDetails.mockResolvedValue(tvShowFromTvMaze);

            const response = await controller.getTvShow()({
                params: {
                    showId: id,
                },
            }) as GetTvShowResponse;

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({
                id,
                name,
                image,
                genres,
                summary,
                imdb: `https://www.imdb.com/title/${imdb}/`,
                cast: [{
                    id: actorId,
                    name: actorName,
                    image: actorImage,
                    character: characterName,
                }],
            });
        });
    });

    describe('List show comments action', () => {
        it('should respond with HTTP 400 if invalid value is given in path', async () => {

        });

        it('should respond with HTTP 500 if unable to query database', async () => {

        });

        it('should respond with HTTP 200 and a list of comments', async () => {

        });
    });

    describe('Create show comment action', () => {
        it('should respond with HTTP 400 if request body is not valid', async () => {

        });

        it('should respond with HTTP 400 if invalid value is given in path', async () => {

        });

        it('should respond with HTTP 500 if unable to save in database', async () => {

        });

        it('should respond with HTTP 200', async () => {

        });
    });
});
