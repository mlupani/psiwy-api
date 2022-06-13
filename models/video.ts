
import { Schema, model } from 'mongoose';

const videoSchema = new Schema({
  authorID: {
    type: Number,
    required: [true, 'The author is required']
  },
  duration: {
    type: Number,
    required: [true, 'The duration is required']
  },
  url: {
    type: String,
    required: [true, 'The uri is required']
  },
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  description: {
    type: String,
    required: [true, 'The description is required']
  },
  custodians: [{
    email: String,
    userName: String
  }],
  receptors: [{
    email: String,
    userName: String
  }],
  delivered: {
    type: Boolean,
    default: false
  },
  deliveryDate: {
    type: Date,
    default: null,
    required: false
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
