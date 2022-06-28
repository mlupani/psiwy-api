import { Request, Response, NextFunction } from 'express';
const { Video } = require('../models');
const { sendMail } = require('../helpers/send-mail');

export const reportDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        message: 'Video not found'
      });
    }
    const { receptors, title, url } = video;

    receptors.forEach(({ email, userName }: {email: string, userName: string}) => {
      sendMail(email, `Aviso de evento ${userName}`, `el video es ${title} y su id es ${id}, su url publica es ${url}`);
    });

    res.json({
      message: 'Email sent'
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
