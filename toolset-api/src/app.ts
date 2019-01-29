import express from 'express';
import Routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import { injectable, inject } from 'inversify';

@injectable()
export default class App {
    public app: express.Application;

    constructor(@inject(Routes) private routes: Routes) {
        this.app = express();
        this.config();

        this.routes.setup(this.app);
    }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }
}