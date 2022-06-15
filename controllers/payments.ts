import { Request, Response } from 'express';
const { Product } = require('../models');
const Stripe = require('stripe');

export const payment = async (req: Request, res: Response) => {
  try {
    const { quantity, id } = req.body;
    const stripe = new Stripe(process.env.SECRETSTRIPEKEY);

    const pagoID = await stripe.paymentIntents.create({
      amount: quantity,
      payment_method: id,
      currency: 'ARS',
      description: 'Productos varios'
    });

    await stripe.paymentIntents.confirm(pagoID);

    const product = await Product.findById(id);
    const newQuantity = product.availableVideoTime + quantity;
    await Product.findByIdAndUpdate(id, { availableVideoTime: newQuantity });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error' });
  }
};
