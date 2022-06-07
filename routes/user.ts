import { Router } from 'express';
import { getUsuarios } from '../controllers/users';
const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
  validarJWT
], getUsuarios);

module.exports = router;
