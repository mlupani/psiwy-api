import { Request, Response } from 'express';
const { Product } = require('../models');

export const payment = async (req: Request, res: Response) => {
  try {
    const { quantity, id } = req.body;
    const product = await Product.findById(id);
    const newQuantity = product.availableVideoTime + quantity;
    await Product.findByIdAndUpdate(id, { availableVideoTime: newQuantity });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error' });
  }
};
