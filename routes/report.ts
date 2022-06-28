import { Router } from 'express';
import { reportDate } from '../controllers/report';
// const { validarJWT } = require('../middlewares');

const router = Router();

router.post('/', reportDate);

module.exports = router;
