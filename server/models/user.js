const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    password: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    phone: Number,
    isAdmin: {type: Boolean, default: false },
    lastActiveAt: {type: Date, default: Date.now}
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User; 