import { Application, Request, Response } from "express";
import IRequest from "./models/types/IRequest";
import IResponse from "./models/types/IResponse";
import UsersController from "./controllers/usersController";
import authorize from './middlewares/authorize';
import { injectable } from "inversify";


const controllerToRoute = <T, U>(controllerAction: (request: IRequest<T>) => Promise<IResponse<U>>) => {
    return async (req: Request, res: Response): Promise<void> => {
        try {
            const { status, body } = await controllerAction({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            res.status(status).send(body);
        } catch (error) {
            console.error('unexpected error', error);
            res.status(error.status || 500).send(error.message);
        }
    };
};

@injectable()
export default class Routes {
    constructor(private usersController: UsersController) { }

    public async setup(app: Application) {
        app.route('/login')
            .post(controllerToRoute(this.usersController.login()));

        app.route('/register')
            .post(controllerToRoute(this.usersController.register()));

        app.route('/profile')
            .get(authorize('user'),
                controllerToRoute(this.usersController.profile()));
    }
}