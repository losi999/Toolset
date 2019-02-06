import { Application, Request, Response, NextFunction } from "express";
import IRequest from "./models/types/IRequest";
import UsersController from "./controllers/usersController";
import { injectable } from "inversify";
import { ControllerResponse } from './models/types/controllerResponse';
import AuthController from './controllers/authController';


const controllerToRoute = <T>(controllerAction: (request: IRequest<T>) => Promise<ControllerResponse | void>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const resp = await controllerAction({
                body: req.body,
                params: req.params,
                query: req.query,
                headers: req.headers
            });
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
    constructor(private usersController: UsersController,
        private authController: AuthController) { }

    public async setup(app: Application) {
        app.route('/login')
            .post(controllerToRoute(this.usersController.login()));

        app.route('/registration')
            .post(controllerToRoute(this.usersController.registration()));

        app.route('/profile')
            .get(controllerToRoute(this.authController.authorize('user')),
                controllerToRoute(this.usersController.profile()));
    }
}