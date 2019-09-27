const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    title: { type: String, required: true, trim: true },
    subtitle: {type: String, trim: true},
    author: {
      id: { type: String, ref: 'users' },
      name: String
    },
    tags: [{ type: Object, ref: 'tags' }],
    text: { type: String, required: true },
    preview: {type: String, trim: true},
    thumbs: [{type: String, ref: 'users'}],
    type: {type: String, enum: ['artigo', 'noticia']},
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
