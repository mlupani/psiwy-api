
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  avaliableVideoTime: {
    type: Number
    // required: [true, 'El nombre es obligatorio']
  },
  usedVideoTime: {
    type: Number
    // required: [true, 'El correo es obligatorio'],
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};

module.exports = model('User', UserSchema);
