const mongoose = require('mongoose');
const { Schema } = mongoose;

const phoneNumberSchema = new Schema({
    name: String,
    phoneNumber: String
});

module.exports = phoneNumberSchema;