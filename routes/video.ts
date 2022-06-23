import { Router } from 'express';
import { getVideos, postVideos, updateVideo, deleteVideo } from '../controllers/videos';
const { validarJWT } = require('../middlewares');
const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const router = Router();

router.get('/', getVideos);
router.post('/', multer.single('file'), postVideos);
router.put('/:id', [
  validarJWT
], updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
