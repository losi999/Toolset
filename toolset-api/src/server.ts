import 'reflect-metadata';
import App from './app';
import container from './inversify.config';

const port = process.env.PORT;
container.get(App).app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
