import { Request, Response } from 'express';
import { IUser } from '../interfaces';
const { User } = require('../models');
const cron = require('node-cron');

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const users: Promise<IUser[]> = await User.find();
    cron.schedule('0 29 16 12 6 0', () => {
      console.log('running a task on 16:20');
    }, { scheduled: true, timezone: 'America/Buenos_Aires' });

    res.json({
      users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error on get users'
    });
  }
};
