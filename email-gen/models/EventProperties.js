const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventPropertiesSchema = new Schema({
    locationName: String,
    locationLink: String,
    locationAddress: String,
    dayOfWeek: String,
    lastEC: String
});

mongoose.model('event-properties', eventPropertiesSchema);