const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
});

UserSchema.pre('save', async function () {
    const user = this;
    if (!user.isModified('password')) return;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;
