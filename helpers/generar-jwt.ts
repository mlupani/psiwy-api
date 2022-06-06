const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '7d'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('Error on generate token');
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generarJWT
};
