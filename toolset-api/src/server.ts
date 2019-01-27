import App from './app';
import Routes from './routes';
import UsersController from './controllers/usersController';
import UserRepository from './repositories/userRepository';

const userRepository = new UserRepository();
const usersController = new UsersController(userRepository);
const routes = new Routes(usersController);
const app = new App(routes);

const port = process.env.PORT;
app.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
