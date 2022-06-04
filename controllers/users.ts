import { Request, Response } from 'express';
import { IUser } from '../interfaces';
const { User } = require('../models');

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const users: Promise<IUser[]> = await User.find();
    res.json({
      users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener los usuarios'
    });
  }
};
