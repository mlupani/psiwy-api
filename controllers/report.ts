import { Request, Response } from 'express';
// const { Video } = require('../models');

export const report = async (req: Request, res: Response) => {
  try {
    // const { id } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error' });
  }
};
