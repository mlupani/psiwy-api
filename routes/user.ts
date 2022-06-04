import { Router } from 'express';
import { getUsuarios } from '../controllers/users';

const router = Router();

router.get('/', getUsuarios);

export default router;
