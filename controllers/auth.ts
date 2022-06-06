import { Request, Response } from 'express';
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'User or password incorrect'
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User or password incorrect'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Internal server error'
    });
  }
};

const validateTokenUser = async (req: Request, res: Response) => {
  // Generar el JWT
  const token = await generarJWT(req.user._id);

  res.json({
    user: req.user,
    token
  });
};

module.exports = {
  login,
  validateTokenUser
};
