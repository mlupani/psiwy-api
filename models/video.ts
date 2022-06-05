
import { Schema, model } from 'mongoose';

const videoSchema = new Schema({
  authorID: {
    type: Number,
    required: [true, 'El autor es obligatorio']
  },
  duration: {
    type: Number,
    required: [true, 'La duracion es obligatoria']
  },
  url: {
    type: String,
    required: [true, 'La url es obligatoria']
  },
  title: {
    type: String,
    required: [true, 'El titulo es obligatorio']
  },
  description: {
    type: String,
    required: [true, 'La descripcion es obligatoria']
  },
  custodians: [
    {
      type: Number,
      required: [true, 'El custodio es obligatorio']
    }
  ],
  receptors: [
    {
      type: Number,
      required: [true, 'El receptor es obligatorio']
    }
  ],
  delivered: {
    type: Boolean,
    default: false
  },
  deliveryDate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

videoSchema.methods.toJSON = function () {
  const { __v, _id, ...video } = this.toObject();
  video.id = _id;
  return video;
};

module.exports = model('Video', videoSchema);
