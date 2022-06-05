import { Router } from 'express';
import { getVideos, postVideos, updateVideo, deleteVideo } from '../controllers/videos';

const router = Router();

router.get('/', getVideos);
router.post('/', postVideos);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
