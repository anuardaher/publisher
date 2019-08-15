const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4()
    },
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'tags' }],
    text: { type: String, required: true },
    thumbs: [Schema.Types.ObjectId],
    type: { type: String, enum: ['article', 'notice'] },
    views: Number
  },
  {
    timestamps: {}
  }
);

module.exports = mongoose.model('Article', articleSchema);
