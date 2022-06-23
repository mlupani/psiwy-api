import { Request, Response } from 'express';
// const { Video } = require('../models');
const { sendMail } = require('../helpers/send-mail');

export const report = async (req: Request, res: Response) => {
  try {
    /*
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
    */
    sendMail('mlupani2@gmail.com', 'aviso de evento', 'contenido');
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
