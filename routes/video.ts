import { Router } from 'express';
import { getVideos, postVideos, updateVideo, deleteVideo } from '../controllers/videos';
const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
  validarJWT
], getVideos);
router.post('/', [
  validarJWT
], postVideos);
router.put('/:id', [
  validarJWT
], updateVideo);
router.delete('/:id', [
  validarJWT
], deleteVideo);

module.exports = router;
