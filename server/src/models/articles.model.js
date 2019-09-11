const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    title: { type: String, required: true },
    subtitle: String,
    author: {
      id: { type: String, ref: 'users' },
      name: String,
    },
    tags: [{ type: Object, ref: 'tags' }],
    text: { type: String, required: true },
    thumbs: [{type: String, ref: 'users'}],
    type: {type: String, enum: ['article', 'notice']},
    views: Number,
    active: {type: Boolean, default: true},
    img: String,
    views: Number,
  },
  {
    timestamps: {}
  }
);

module.exports = new mongoose.model('Article', articleSchema);
