import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Routing
import baseRoute from './routes/BaseRoute';
import userRoute from './routes/UserRoutes';
import petRoute from './routes/PetRoutes';

dotenv.config({ path: `${__dirname}/.env` });

class App {
  server: express.Application;

  dotenv: any;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
    this.server.use(express.static('public'));
  }

  routes() {
    this.server.use(baseRoute);
    this.server.use('/api/users', userRoute);
    this.server.use('/api/pets', petRoute);
  }
}

export default new App().server;
