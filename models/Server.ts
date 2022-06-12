import express, { Application } from 'express';
import cors from 'cors';
const { userRouter, productRouter, videoRouter, authRouter, paymentRouter, reportRouter } = require('../routes');
const { dbConnection } = require('../database/config');

class Server {
  private app: Application;
  private port: string;
  private paths = {
    users: '/api/user',
    products: '/api/products',
    videos: '/api/videos',
    auth: '/api/auth',
    payment: '/api/payment',
    report: '/api/date'
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
    this.app.use(express.urlencoded());
    this.app.use(express.static('public'));
  }

  routes () {
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.products, productRouter);
    this.app.use(this.paths.videos, videoRouter);
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.payment, paymentRouter);
    this.app.use(this.paths.report, reportRouter);
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
