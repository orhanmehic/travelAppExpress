const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text:String,
    response:String,
    travel:{type: mongoose.Schema.Types.ObjectId, ref:'Travel'}
});

const questionModel = new mongoose.model('Question',questionSchema);

module.exports = questionModel;

