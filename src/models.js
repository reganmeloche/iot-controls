const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    text: String,
    date: Date,
});

mongoose.model('messages', messageSchema);