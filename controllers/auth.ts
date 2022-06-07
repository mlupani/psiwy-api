import { Request, Response } from 'express';
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(400).json({
        msg: 'User or password incorrect'
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User or password incorrect'
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
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
  const token = await generarJWT(req?.user);

  res.json({
    user: req.user,
    token
  });
};

module.exports = {
  login,
  validateTokenUser
};
