const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: {type: String, trim: true, lowercase: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    profession: {type: String, trim: true },
    provider: {type: String, enum: ['facebook', 'linkedin', 'cadastro'], default: 'cadastro'},
    img: { type: String },
    bio: { type: String, trim: true },
    followers: { type: Number, default: 0 },
    following: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    salt: { type: String},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: {
      street: String,
      complement: String,
      country: String,
      state: String,
      city: String,
      zipcode: String,
      number: String,
    },
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
    .pbkdf2Sync(password, this.salt, 10000, 32, 'sha512')
    .toString('hex');
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 32, 'sha512')
    .toString('hex');
  return this.password === hash;
};

module.exports = new mongoose.model('User', userSchema);
