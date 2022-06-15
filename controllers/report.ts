import { Request, Response } from 'express';
const { Video } = require('../models');
const sendgrid = require('@sendgrid/mail');
const { sendMail } = require('../helpers/send-mail');

export const report = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const video = await Video.findById(id);
    const { receptors } = video;

    sendgrid.setApiKey(process.env.SENGRID_API_KEY);

    receptors.forEach(({ email, userName }: {email: string, userName: string}) => {
      sendMail(email, `Aviso de evento ${userName}`, `el video es ${video.title} y su id es ${video.id}, su url publica es ${video.url}`);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
