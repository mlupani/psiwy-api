const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');

const { login, validateTokenUser } = require('../controllers/auth');

const router = Router();

router.post('/login', [
  check('correo', 'The email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validarCampos
], login);

router.get('/', [
  validarJWT
], validateTokenUser);

module.exports = router;
