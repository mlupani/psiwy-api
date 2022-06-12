import { Router } from 'express';
import { getUsuarios } from '../controllers/users';
// const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', getUsuarios);

module.exports = router;
