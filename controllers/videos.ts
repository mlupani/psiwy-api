import { Request, Response } from 'express';
import { IVideo } from '../interfaces';
const { Video } = require('../models');

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos: Promise<IVideo[]> = await Video.find();
    res.json({
      videos
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener los videos'
    });
  }
};

export const postVideos = async (req: Request, res: Response) => {
  console.log(req.body);
  // TODO: guardar en storage
  try {
    const { title, description, url, duration, authorID, custodians, receptors } = req.body;
    const video = new Video({
      authorID,
      duration,
      url,
      title,
      description,
      custodians,
      receptors
    });
    const newVideo: Promise<IVideo> = await video.save();
    res.json({
      newVideo
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al crear el video'
    });
  }
};
