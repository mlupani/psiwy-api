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
      message: 'Error on get videos'
    });
  }
};

export const postVideos = async (req: Request, res: Response) => {
  // TODO: save on storage and validate the user can upload the video (duration)
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
