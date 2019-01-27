import express from 'express';
import Routes from './routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

export default class App {
    public app: express.Application;

    constructor(private routes: Routes) {
        this.app = express();
        this.config();

        this.routes.setup(this.app);
    }

    private config() {
        this.app.use(bodyParser.json());

        mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`, {
            useCreateIndex: true,
            useNewUrlParser: true
        }, (error) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log(`MongoDB connected: ${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`);
            }
        });
    }
}