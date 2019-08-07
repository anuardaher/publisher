const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

const { Schema } = mongoose;

const userSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profession: String,
    followers: { type: Number, default: 0 },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    salt: String,
    facebook: {
        id: String,
        token: String,
    },
    linkedin: {
        id: String
    }
}, {
    timestamps: {}
})

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model("User", userSchema);