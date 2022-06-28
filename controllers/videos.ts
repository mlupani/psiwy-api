import { Request, Response, NextFunction } from 'express';
import { IVideo } from '../interfaces';
// const fetch = require('node-fetch');
const { Video, User } = require('../models');
const { Storage } = require('@google-cloud/storage');
const { CloudTasksClient } = require('@google-cloud/tasks');
const { format } = require('util');
const { getVideoDurationInSeconds } = require('get-video-duration');
// const { sendMail } = require('../helpers/send-mail');

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
  try {
    console.log(req.body);
    const { title, description, authorID, custodians, receptors, deliveryDate = null } = req.body;
    let url = '';
    let duration = 0;
    const userId = '629b8e33602c1e936e51371a';

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const avaliableVideoTime = user.avaliableVideoTime;

    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

    const blob = bucket.file(title);
    const blobStream = blob.createWriteStream({
      resumable: true
    });

    blobStream.on('error', (err: any) => {
      console.log(err);
      next(err);
    });

    blobStream.on('finish', async () => {
      url = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      console.log('url publica: ' + url);

      try {
        duration = await getVideoDurationInSeconds(url);
      } catch (error) {
        console.log(error);
      }

      const durationInMiliseconds = duration * 1000;
      if (durationInMiliseconds > avaliableVideoTime) {
        await storage.bucket(process.env.GCLOUD_STORAGE_BUCKET).file(title).delete();
        return res.status(400).json({
          error: 'Video duration is too long for user time limit'
        });
      }

      const mins = deliveryDate.substring(14, 16);
      const hour = deliveryDate.substring(11, 13);
      const day = deliveryDate.substring(0, 2);
      const month = deliveryDate.substring(3, 5);
      const year = deliveryDate.substring(6, 10);

      const newDate = new Date(year + '-' + month + '-' + day + 'T' + hour + ':' + mins + ':00.000Z');

      const video = new Video({
        authorID,
        duration: durationInMiliseconds.toFixed(2),
        url,
        title,
        description,
        custodians,
        receptors,
        deliveryDate: deliveryDate !== null ? newDate.toString() : null
      });
      const newVideo: IVideo = await video.save();

      // send email to custodians with de url to report video
      /*
      custodians.forEach(({ email }: {email: string}) => {
        sendMail(email, `opcion para reportar el evento ${title}`, 'Puede reportar el evento en la siguiente url: ');
      });
      */

      // if deliveryDate is not null, make a cronjob to notify the event
      if (deliveryDate) {
        const client = new CloudTasksClient();
        /* task google cloud */
        const project = 'psiwy-352918';
        const queue = 'my-queue';
        const location = 'us-central1';

        console.log('before send task:');

        // Construct the fully qualified queue name.
        const parent = client.queuePath(project, location, queue);
        const task = {
          httpRequest: {
            httpMethod: 'POST',
            url: `${process.env.PROJECT_URL}/api/date`,
            Headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: newVideo.id
            })
          },
          // scheduleTime: { seconds: Math.floor(newDate.getTime() / 1000) + Date.now() / 1000 }
          scheduleTime: { seconds: 10 + Date.now() / 1000 }
        };

        console.log('Sending task:');
        // console.log(task);
        // Send create task request.
        const request = { parent, task };
        const [response] = await client.createTask(request);
        const name = response.name;
        console.log(`Created task ${name}`);
      }
      /*
        const cron = require('node-cron');
        cron.schedule(`0 ${mins} ${hour} ${day} ${month} *`, () => {
          const params = {
            id: newVideo.id
          };
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          };
          fetch(`http://localhost:${process.env.PORT}/api/date`, options);
        }, { scheduled: true, timezone: 'America/Buenos_Aires' });
        */

      // update user new avaliableVideoTime
      const newAvaliableVideoTime = avaliableVideoTime - durationInMiliseconds;
      await User.findByIdAndUpdate(userId, {
        avaliableVideoTime: newAvaliableVideoTime.toFixed(2),
        usedVideoTime: (user.usedVideoTime + durationInMiliseconds).toFixed(2)
      });

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
  try {
    const { title, description, url, duration, authorID, custodians, receptors } = req.body;
    const video = await Video.findById(req.params.id);

    if (video.delivered === true) {
      return res.status(400).json({
        message: 'Video is already delivered'
      });
    }

    const videoUpdate = await Video.findByIdAndUpdate(req.params.id, {
      title,
      description,
      url,
      duration,
      authorID,
      custodians,
      receptors
    }, { new: true });
    res.json({
      videoUpdate
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
    const storage = new Storage();
    await storage.bucket(process.env.GCLOUD_STORAGE_BUCKET).file(video.title).delete();
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
