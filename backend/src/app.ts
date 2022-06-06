const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

// Routing
import baseRoute from './routes/BaseRoute';
import userRoute from './routes/UserRoutes';
import petRoute from './routes/PetRoutes';

dotenv.config({ path: `${__dirname}/.env` });

class App {
  server: any;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
    this.server.use(express.static(__dirname + '/public'));
  }

  routes() {
    this.server.use(baseRoute);
    this.server.use('/api/users', userRoute);
    this.server.use('/api/pets', petRoute);
  }
}

export default new App().server;
