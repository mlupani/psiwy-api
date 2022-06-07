import { Router } from 'express';
import { getProducts } from '../controllers/products';
const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
  validarJWT
], getProducts);

module.exports = router;
