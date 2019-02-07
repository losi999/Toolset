import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { inject, injectable } from 'inversify';
import Routes from './routes';

@injectable()
export default class App {
    public app: express.Application;

    constructor(@inject(Routes) private routes: Routes) {
        this.app = express();
        this.config();

        this.routes.setup(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }
}
