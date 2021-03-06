import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  // HACERLO CON AUTHORIZATION: BEARER

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No token'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const user = await Usuario.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Token is not valid'
      });
    }

    req.user = user.id;
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};

module.exports = validarJWT;
