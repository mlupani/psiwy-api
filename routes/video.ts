import { Router } from 'express';
import { getVideos, postVideos } from '../controllers/videos';

const router = Router();

router.get('/', getVideos);
router.post('/', postVideos);

module.exports = router;
