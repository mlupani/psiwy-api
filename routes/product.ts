import { Router } from 'express';
import { getProducts, postProducts } from '../controllers/products';
const { validarJWT } = require('../middlewares');

const router = Router();

router.get('/', [
  validarJWT
], getProducts);

router.post('/', postProducts);

module.exports = router;
