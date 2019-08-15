const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4(),
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profession: String,
    photo: { type: String },
    bio: { type: String },
    followers: { type: Number, default: 0 },
    following: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    salt: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'articles' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    facebook: {
      id: String,
      token: String,
    },
    linkedin: {
      id: String,
    },
  },
  {
    timestamps: {},
  }
);

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.password === hash;
};

module.exports = mongoose.model('User', userSchema);
