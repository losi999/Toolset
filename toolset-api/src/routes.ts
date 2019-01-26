import { Application, Request, Response } from "express";
import { IRequest } from "./models/types/IRequest";
import { IResponse } from "./models/types/IResponse";
import UsersController from "./controllers/usersController";

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
            res.status(400).send(error);
        }
    };
};

export default class Routes {
    constructor(private usersController: UsersController) { }

    public setup(app: Application) {
        app.route('/login')
            .post(controllerToRoute(this.usersController.login));

        app.route('/register')
            .post(controllerToRoute(this.usersController.register));
    }
}