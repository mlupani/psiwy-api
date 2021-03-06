import { Request, Response } from 'express';
import { IProduct } from '../interfaces';
const { Product } = require('../models');

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products: Promise<IProduct[]> = await Product.find();
    res.json({
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error on get products'
    });
  }
};

export const postProducts = async (req: Request, res: Response) => {
  console.log(req.body);
};
