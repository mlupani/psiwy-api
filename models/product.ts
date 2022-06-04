
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  avaliableVideoTime: {
    type: Number
    // required: [true, 'El nombre es obligatorio']
  },
  usedVideoTime: {
    type: Number
    // required: [true, 'El correo es obligatorio'],
  }
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.id = _id;
  return product;
};

module.exports = model('Product', ProductSchema);
