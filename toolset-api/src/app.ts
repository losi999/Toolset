import express from 'express';
import Routes from './routes';
import bodyParser from 'body-parser';

export default class App {
    public app: express.Application;

    constructor(private routes: Routes) {
        this.app = express();
        this.config();

        this.routes.setup(this.app);
    }

    private config() {
        this.app.use(bodyParser.json());
    }
}