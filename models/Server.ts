import express, { Application } from 'express';
import userRouter from '../routes/user';
import cors from 'cors';
const { dbConnection } = require('../database/config');

class Server {
  private app: Application;
  private port: string;
  private paths = {
    users: '/api/user'
  };

  constructor () {
    this.app = express();
    this.port = process.env.PORT || '8000';

    dbConnection();
    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes () {
    this.app.use(this.paths.users, userRouter);
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;
