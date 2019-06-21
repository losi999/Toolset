import 'reflect-metadata';
import ActorsController from '@/controllers/actorsController';
import TvMazeService from '@/services/tvMazeService';
import { BadRequestResponse, ListActorsResponse, GetActorResponse } from '@/models/types/controllerResponses';
import { TvMazeActorListItem, TvMazeActorDetails } from '@/models/types/types';

describe('Actors controller', () => {
    let mockTvMazeService: TvMazeService;
    let mockSearchActors: jest.Mock;
    let mockActorDetails: jest.Mock;

    let controller: ActorsController;

    beforeEach(() => {
        mockSearchActors = jest.fn();
        mockActorDetails = jest.fn();

        mockTvMazeService = new (jest.fn<Partial<TvMazeService>, undefined[]>(() => ({
            searchActors: mockSearchActors,
            actorDetails: mockActorDetails,
        })))() as TvMazeService;

        controller = new ActorsController(mockTvMazeService);
    });

    describe('List actors action', () => {
        it('should respond with HTTP 400 if unexpected query parameter is given', async () => {
            const response = await controller.listActors()({
                query: {
                    notValid: '',
                } as any,
            }) as BadRequestResponse;

            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toEqual('AC001');
        });

        it('should respond with HTTP 400 if empty value is given for "name" query', async () => {
            const response = await controller.listActors()({
                query: {
                    name: '',
                },
            }) as BadRequestResponse;

            expect(response.statusCode).toEqual(400);
            expect(response.body.errorCode).toEqual('AC002');
        });

        it('should respond with HTTP 500 if unable to get reponse from tv maze API', async () => {
            mockSearchActors.mockRejectedValue({});

            const response = await controller.listActors()({
                query: {
                    name: 'some name',
                },
            });

            expect(response.statusCode).toEqual(500);
        });

        it('should respond with HTTP 200 and a list of actors', async () => {
            const id = 1;
            const name = 'John Doe';
            const image = 'http://www.image.com';
            const actorsFromTvMaze: TvMazeActorListItem[] = [{
                person: {
                    id,
                    name,
                    image: {
                        medium: image,
                    },
                },
            }];

            mockSearchActors.mockResolvedValue(actorsFromTvMaze);

            const response = await controller.listActors()({
                query: {
                    name: 'some name',
                },
            }) as ListActorsResponse;

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual([{
                id,
                name,
                image,
            }]);
        });
    });

    describe('Get actor action', () => {
        it('should respond with HTTP 400 if unexpected query parameter is given', async () => {
            const response = await controller.getActor()({
                query: {
                    notValid: '',
                } as any,
            }) as BadRequestResponse;

            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toEqual('AC001');
        });

        it('should respond with HTTP 400 if invalid value is given in path', async () => {
            const response = await controller.getActor()({
                params: {
                    actorId: -1,
                },
            }) as BadRequestResponse;

            expect(response.statusCode).toBe(400);
            expect(response.body.errorCode).toEqual('AC003');
        });

        it('should respond with HTTP 500 if unable to get response from tv maze api', async () => {
            mockActorDetails.mockRejectedValue({});

            const response = await controller.getActor()({
                params: {
                    actorId: 123,
                },
            });

            expect(response.statusCode).toEqual(500);
        });

        it('should respond with HTTP 200 and the actor', async () => {
            const id = 123;
            const name = 'John Doe';
            const image = 'http://www.image.com';
            const dateOfBirth = '1980-01-01';
            const country = 'United States';

            const actorFromTvMaze: TvMazeActorDetails = {
                id,
                name,
                country: {
                    name: country,
                },
                birthday: dateOfBirth,
                image: {
                    medium: image,
                },
            };

            mockActorDetails.mockResolvedValue(actorFromTvMaze);

            const response = await controller.getActor()({
                params: {
                    actorId: id,
                },
            }) as GetActorResponse;

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({
                id,
                name,
                image,
                dateOfBirth,
                country,
            });
        });
    });

    describe('List actor comments action', () => {
        it('should respond with HTTP 400 if invalid value is given in path', async () => {

        });

        it('should respond with HTTP 500 if unable to query database', async () => {

        });

        it('should respond with HTTP 200 and a list of comments', async () => {

        });
    });

    describe('Create actor comment action', () => {
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
