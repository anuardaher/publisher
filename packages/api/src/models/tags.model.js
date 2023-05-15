const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')

const { Schema } = mongoose

const tagSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    name: { type: String, required: true }
  },
  {
    timestamps: {}
  }
)

module.exports = new mongoose.model('Tag', tagSchema)
