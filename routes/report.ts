import { Router } from 'express';
import { report } from '../controllers/report';
const { validarJWT } = require('../middlewares');

const router = Router();

router.post('/', [
  validarJWT
], report);

module.exports = router;
