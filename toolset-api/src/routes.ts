import { Application, NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import AuthController from '@/controllers/authController';
import UsersController from '@/controllers/usersController';
import { ResponseBase } from '@/models/types/controllerResponses';
import ShowsController from '@/controllers/showsController';
import ActorsController from '@/controllers/actorsController';
import CommentsController from '@/controllers/commentsController';

const controllerToRoute = (controllerAction: (request: Request) => Promise<ResponseBase | void>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const resp = await controllerAction(req);
            if (resp) {
                res.status(resp.statusCode).send(resp.body);
            } else {
                next();
            }

        } catch (error) {
            console.error('unexpected error', error);
            res.sendStatus(500);
        }
    };
};

@injectable()
export default class Routes {
    constructor(
        private usersController: UsersController,
        private showsController: ShowsController,
        private actorsController: ActorsController,
        private commentsController: CommentsController,
        private authController: AuthController) { }

    public setup(app: Application): void {
        app.route('/v1/login')
            .post(controllerToRoute(this.usersController.login()));

        app.route('/v1/registration')
            .post(controllerToRoute(this.usersController.registration()));

        app.route('/tv/v1/shows')
            .get(controllerToRoute(this.showsController.listTvShows()));

        app.route('/tv/v1/shows/:showId')
            .get(controllerToRoute(this.showsController.getTvShow()));

        app.route('/tv/v1/shows/:showId/comments')
            .get(
                controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.showsController.listTvShowComments()),
            )
            .post(
                controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.showsController.createTvShowComment()),
            );

        app.route('/tv/v1/actors')
            .get(controllerToRoute(this.actorsController.listActors()));

        app.route('/tv/v1/actors/:actorId')
            .get(controllerToRoute(this.actorsController.getActor()));

        app.route('/tv/v1/actors/:actorId/comments')
            .get(
                controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.actorsController.listActorComments()),
            )
            .post(
                controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.actorsController.createActorComment()),
            );

        app.route('/tv/v1/comments/:commentId/like')
            .post(
                controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.commentsController.likeComment()),
            )
            .delete(
                controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.commentsController.unlikeComment()),
            );
    }
}
