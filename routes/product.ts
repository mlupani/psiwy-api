import { Router } from 'express';
import { getProducts } from '../controllers/products';

const router = Router();

router.get('/', getProducts);

module.exports = router;
