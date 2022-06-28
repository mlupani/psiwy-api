import { Request, Response, NextFunction } from 'express';
const { Video } = require('../models');
const { sendMail } = require('../helpers/send-mail');

export const reportDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        message: 'Video not found'
      });
    }
    const { receptors } = video;

    receptors.forEach(({ email, userName }: {email: string, userName: string}) => {
      sendMail(email, `Aviso de evento ${userName}`, `el video es ${video.title} y su id es ${video.id}, su url publica es ${video.url}`);
    });

    sendMail('mlupani2@gmail.com', 'Aviso de evento', 'descripcion');
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
