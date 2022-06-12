import { Request, Response } from 'express';
const { Video } = require('../models');
const sendgrid = require('@sendgrid/mail');

export const report = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const video = await Video.findById(id);
    const { receptors } = video;
    // const { email } = await User.findById(receptors);
    sendgrid.setApiKey(process.env.SENGRID_API_KEY);
    const msg = {
      to: 'mlupani2@gmail.com',
      from: 'mlupani2@gmail.com',
      subject: 'Sending with SendGrid Is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };
    sendgrid
      .send(msg)
      .then((resp: any) => {
        console.log('Email sent\n', resp);
        return res.json({
          message: 'Email sent'
        });
      })
      .catch((error: any) => {
        res.status(500).json({ message: error });
      });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};