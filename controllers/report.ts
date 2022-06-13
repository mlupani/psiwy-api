import { Request, Response } from 'express';
const { Video } = require('../models');
const sendgrid = require('@sendgrid/mail');

export const report = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const video = await Video.findById(id);
    const { receptors } = video;

    sendgrid.setApiKey(process.env.SENGRID_API_KEY);

    receptors.forEach(({ email, userName }: {email: string, userName: string}) => {
      const msg = {
        to: email,
        from: 'mlupani2@gmail.com',
        subject: `Aviso de evento ${userName}`,
        text: `el video es ${video.title} y su id es ${video.id}`
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
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
