import { Router } from 'express';
import { payment } from '../controllers/payments';
const { validarJWT } = require('../middlewares');

const router = Router();

router.post('/', [
  validarJWT
], payment);

module.exports = router;
