const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    accessToken: String,
    refreshToken: String,
    authCode: String
});

mongoose.model('users', userSchema);