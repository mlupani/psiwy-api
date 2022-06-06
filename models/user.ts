
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  avaliableVideoTime: {
    type: Number
  },
  usedVideoTime: {
    type: Number
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};

module.exports = model('User', UserSchema);
