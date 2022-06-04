import { Request, Response } from 'express';
// import db from '../database/config';
// const User = require('../models/usuario');

export const getUsuarios = async (req: Request, res: Response) => {
  res.json({
    msg: 'getUsuarios',
    users: []
  });
};
