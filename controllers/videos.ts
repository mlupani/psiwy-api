import { Request, Response, NextFunction } from 'express';
import { IVideo } from '../interfaces';
const { Video } = require('../models');
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const { getVideoDurationInSeconds } = require('get-video-duration');

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos: Promise<IVideo[]> = await Video.find();
    res.json({
      videos
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error on get videos'
    });
  }
};

export const postVideos = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: save on storage and validate the user can upload the video (duration)
  try {
    const { title, description, authorID, custodians, receptors } = req.body;
    let url = '';
    let duration = 0;

    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    console.log(req.file.path);

    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    blobStream.on('error', (err: any) => {
      next(err);
    });

    blobStream.on('finish', async () => {
      url = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      duration = await getVideoDurationInSeconds(url);

      const video = new Video({
        authorID,
        duration: (duration * 1000).toFixed(2),
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
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error on create video'
    });
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  // TODO: Check the video is not delivered yet
  try {
    const { title, description, url, duration, authorID, custodians, receptors } = req.body;
    const video = await Video.findByIdAndUpdate(req.params.id, {
      title,
      description,
      url,
      duration,
      authorID,
      custodians,
      receptors
    }, { new: true });
    res.json({
      video
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error on update video'
    });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    res.json({
      video
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error on delete video'
    });
  }
};
