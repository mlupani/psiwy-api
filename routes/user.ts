import { Router } from 'express';
import { getUsuarios } from '../controllers/users';

const router = Router();

router.get('/', getUsuarios);
// router.post('/', postUsuarios);
// router.put('/:id', putUsuarios);
// router.patch('/:id', patchUsuarios);
// router.delete('/:id', deleteUsuarios);

export default router;
