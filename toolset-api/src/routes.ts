import { Application, NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import AuthController from '@/controllers/authController';
import UsersController from '@/controllers/usersController';
import { ResponseBase } from '@/models/types/controllerResponses';

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
            res.status(error.status || 500).send(error.message);
        }
    };
};

@injectable()
export default class Routes {
    constructor(
        private usersController: UsersController,
        private authController: AuthController) { }

    public setup(app: Application): void {
        app.route('/login')
            .post(controllerToRoute(this.usersController.login()));

        app.route('/registration')
            .post(controllerToRoute(this.usersController.registration()));

        app.route('/profile')
            .get(
                controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.usersController.profile()),
            );
    }
}
